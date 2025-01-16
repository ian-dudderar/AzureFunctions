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
  const name = "jlipo@maxwoodfurniture.com";
  const password =
    "d596e31ce95d9f9cc21c46b04a1970db835e8c97a36c31609a9295986e4ad1b1";
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

  console.log("TICKET NUM: ", ticketNum);
  console.log("REPRESENTATIVE: ", representativeEmail);

  if (!ticketNum || !representativeEmail) {
    console.log("failing here");
    const stringResponse =
      "Please provide a ticket number and representative email.";
    return {
      body: JSON.stringify({ response: stringResponse }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // We have a standard way of formatting the representative, except with grace who has been here a long time, so we have to hard code hers.
  const representative =
    representativeEmail === "gverrochi@maxwoodfurniture.com"
      ? "GRACE"
      : representativeEmail.split("@")[0].toUpperCase();

  let response = null;

  console.log("fetching data from gorgias...");
  try {
    response = await fetch(
      `https://maxwoodfurniture.gorgias.com/api/tickets/${ticketNum}/custom-fields`,
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
  console.log(response);
  const data = await response.json();
  console.log(data);
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

  //We need the prepended 0 for single digit reason codes due to formatting, excel is really annoying about displaying those.
  // if (reasonCode < 10) {
  //   reasonCode = `0${reasonCode}`;
  // }

  const stringResponse = `SKU${sku}|KG${kitGroup}|RC${reasonCode}|DOC${doc}|REP${representative}|TIX${ticketNum}`;
  console.log(stringResponse);

  return {
    body: JSON.stringify({ response: stringResponse }),
    headers: { "Content-Type": "application/json" },
  };
}

// Again, used to parse the body of the post request before we switched to a get.

// function parseQueryStringToJson(queryString) {
//   return queryString.split("&").reduce((acc, pair) => {
//     const [key, value] = pair.split("=");
//     acc[key] = value;
//     return acc;
//   }, {});
// }

app.http("stringConcat", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: stringConcat,
});
