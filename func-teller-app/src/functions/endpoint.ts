import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
let nodemailer = require("nodemailer");

export async function webhook(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const password = process.env.SENDER_PASSWORD;
  const sender = process.env.EMAIL_SENDER;
  const recipient = process.env.EMAIL_RECIPIENT;
  let bodyString = "";
  context.log(`Http function processed request for url "${request.url}"`);
  try {
    let body = await request.json();
    bodyString = JSON.stringify(body);
    // context.log(JSON.stringify(body));
  } catch (e) {}
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: sender,
      pass: password,
    },
    secure: true,
  });

  const htmlString = `<div><h2>New transaction!!</h2><p>${bodyString}</p></div>`;

  const mailData = {
    from: sender,
    to: recipient,
    subject: `New Transaction!!`,
    html: htmlString,
  };

  transporter.sendMail(mailData, function (err: any, info: any) {
    if (err) console.log(err);
    else console.log(info);
  });

  return { body: `Hello!` };
}

app.http("webhook", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: webhook,
});
