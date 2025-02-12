This is a tool I built upon request.

Our current customer review and ticketing system allows for embedding HTTP endpoints (GET requests only).

Previously, in order to fetch order data tied to specific customer service tickets, our reps would have to manually construct
an input string of the relevant data. This Azure function enables the page to automatically fetch the formatted string
via the embed and insert it into the necessary location, ensuring that the order information is automatically retrieved and displayed.