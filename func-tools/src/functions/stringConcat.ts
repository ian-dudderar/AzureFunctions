import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import * as xlsx from "xlsx";

export async function stringConcat(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const name = process.env.USERNAME;
  const password = process.env.GORGIAS_KEY;
  const credentials = `${name}:${password}`;
  const base64Creds = btoa(credentials);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${base64Creds}`,
    },
  };

  // These are the reason codes given to us my gorgias. Using the supplied reasons, we map them to the corresponding reason code.
  const workbook = xlsx.readFile("./public/reasonCodes.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const reasonCodes = xlsx.utils.sheet_to_json(sheet);

  let sku,
    kitGroup,
    reasonCode,
    doc = null;

  // The following was used to parse the body of the post request format.
  // The third party we are using to send the request can only receive data from a get request so we had to change it.

  // const reader = await request.body.getReader();
  // let chunks = "";
  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) {
  //     break;
  //   }
  //   chunks += new TextDecoder().decode(value);
  // }
  // const res = parseQueryStringToJson(chunks);
  // const { ticketNum, representative } = res;

  const ticketNum = request.query.get("ticketNum");
  const representativeEmail = request.query.get("representative");

  if (!ticketNum || !representativeEmail) {
    const stringResponse =
      "Please provide a ticket number and representative email.";
    return {
      body: JSON.stringify({ response: stringResponse }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // We have a standard way of formatting the representative, except with grace who has been here a long time, so we have to hard code hers.
  const representative =
    representativeEmail === process.env.GRACE
      ? "GRACE"
      : representativeEmail.split("@")[0].toUpperCase();

  let response = null;

  console.log("fetching data from gorgias...");
  try {
    const url = process.env.GORGIAS_BASE_URL;
    response = await fetch(
      `${url}/api/tickets/${ticketNum}/custom-fields`,
      options
    );
  } catch (e) {
    console.log("ERROR!");
    const stringResponse = "Invalid Ticket Number Provided. Please try again.";
    return {
      body: JSON.stringify({ response: stringResponse }),
      headers: { "Content-Type": "application/json" },
    };
  }
  const data = await response.json();
  if (data.data) {
    for (const object of data.data) {
      const field = object.field.label;
      const value = object.value;
      switch (field) {
        case "Replacement SKU":
          console.log("setting sku to...", value);
          sku = value;
          break;
        case "Reason Codes":
          console.log("setting reason codes to...", value);
          reasonCode = value;
          break;
        case "Kit Group":
          console.log("setting kit group to...", value);
          kitGroup = value;
          break;
        case "Previous Doc#":
          console.log("setting doc# to...", value);
          doc = value;
          break;
        default:
          console.log("FIELD: ", field);
      }
    }
  } else {
    const stringResponse =
      "There is missing info on the gorgias ticket. Please make sure the ticket has a 'Replacement SKU', 'Reason Codes', 'Kit Group', and 'Previous Doc#' field.";
    return {
      body: JSON.stringify({ response: stringResponse }),
      headers: { "Content-Type": "application/json" },
    };
  }

  for (const reason of reasonCodes) {
    if (reason["RowReason"] && reason["RowReason"].includes(reasonCode)) {
      reasonCode = reason["RowID"];
      break;
    }
  }

  if (!sku || !kitGroup || !reasonCode || !doc) {
    const stringResponse =
      'There is missing info on the gorgias ticket. Please make sure the ticket has a "Replacement SKU", "Reason Codes", "Kit Group", and "Previous Doc#" field.';
    return {
      body: JSON.stringify({ response: stringResponse }),
      headers: { "Content-Type": "application/json" },
    };
  }

  const stringResponse = `SKU${sku}|KG${kitGroup}|RC${reasonCode}|DOC${doc}|REP${representative}|TIX${ticketNum}`;

  return {
    body: JSON.stringify({ response: stringResponse }),
    headers: { "Content-Type": "application/json" },
  };
}

app.http("stringConcat", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: stringConcat,
});
