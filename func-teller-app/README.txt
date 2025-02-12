This is the backbone for a personal budgeting project I'm working on.

It serves as a webhook endpoint for Teller, a platform that allows developer to connect to their bank account.

The basic idea here being I have created a Teller app and linked it to my bank account, and established
a webhook for their Transactions API.

https://teller.io/docs/api/webhooks

The webhook handles the transaction data, and inserts it into a postgres database which I've hosted on Amazon AWS.

This allows me to build a dynamic frontend to manage my budgeting and provide me with reports, kept up to date via the API with
each transaction I make, instead of me having to enter each one by hand.

Note that there is some rough code commented out, this is there to help me test certain flows by receiving the transaction data via email
when necessary.