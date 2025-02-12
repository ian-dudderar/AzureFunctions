import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
let nodemailer = require("nodemailer");
const { Pool } = require("pg");

interface Transaction {
  user_id: number;
  amount: number;
  date: Date;
  description: string;
}

export async function webhook(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const body: any = await request.json();
    const transaction: Transaction = body?.transaction;
    if (!transaction) {
      return {
        status: 400,
        body: "Transaction data is missing.",
      };
    }

    const pool = new Pool({
      connectionString: process.env.DB_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false }, // Required for Azure-hosted PostgreSQL
    });

    const client = await pool.connect();
    const query =
      "INSERT INTO transaction (user_id, amount, description, date) VALUES ($1, $2, $3)";
    const values = [
      transaction.user_id,
      transaction.amount,
      transaction.description,
      transaction.date,
    ];

    const result = await client.query(query, values);
    client.release(); // Release the client
  } catch (error) {
    context.log("Database insert failed:", error);
  }

  // const password = process.env.SENDER_PASSWORD;
  // const sender = process.env.EMAIL_SENDER;
  // const recipient = process.env.EMAIL_RECIPIENT;
  // let bodyString = "";
  // context.log(`Http function processed request for url "${request.url}"`);
  // try {
  //   let body = await request.json();
  //   bodyString = JSON.stringify(body);
  // } catch (e) {}
  // const transporter = nodemailer.createTransport({
  //   port: 465,
  //   host: "smtp.gmail.com",
  //   auth: {
  //     user: sender,
  //     pass: password,
  //   },
  //   secure: true,
  // });

  // const htmlString = `<div><h2>New transaction!!</h2><p>${bodyString}</p></div>`;

  // const mailData = {
  //   from: sender,
  //   to: recipient,
  //   subject: `New Transaction!!`,
  //   html: htmlString,
  // };

  // transporter.sendMail(mailData, function (err: any, info: any) {
  //   if (err) console.log(err);
  //   else console.log(info);
  // });

  return { body: `Hello!` };
}

app.http("webhook", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: webhook,
});
