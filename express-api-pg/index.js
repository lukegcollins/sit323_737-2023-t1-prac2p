const { json } = require("express");
const express = require("express");
const db = require("./routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Luke's Superhero Address Book!");
});

app.get("/contacts", db.getContacts);
app.get("/contacts/:id", db.getContactById);
app.post("/contacts", db.createContact);
app.patch("/contacts/:id", db.updateContact);
app.delete("/contacts/:id", db.deleteContact);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
