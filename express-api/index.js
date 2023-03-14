const { json } = require("express");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let contacts = [
    { id: 1, name: "Spiderman", email: "p.parker@example.com", phone: "1800300100" },
    { id: 2, name: "Batman", email: "b.wayne@example.com", phone: "1800100300" }
];

app.get("/", (request, response) => {

});

app.get("/contacts/", (request, response) => {
    response.status(200).json(contacts);
});

app.get("/contacts/:id", function (request, response) {
    const contactId = request.params.id;
    var contactFound = false;

    contacts.forEach((contact, index, array) => {
        if (contact.id == contactId) {
            response.status(200).json(contacts[index]);
            contactFound = true;
        }
    });

    if (contactFound == false)
        response.status(404).json(`The requested resource with an id of ${contactId} could not be located.`);

});

app.post("/contacts", (request, response) => {
    const newContact = request.body;

    console.log(newContact);
    if (newContact === undefined || Object.keys(newContact).length === 0) {
        console.log(`Error: ${request.body} is undefined.`);
        response.status(400).json(`Looks like a bad request, please check your request and try again.`);
    } else {
        contacts.push(newContact);
        response.status(201).json(newContact);
    }
});

app.put('/contacts/:id', (request, response) => {
    let contactId = parseInt(request.params.id);
    let updatedContact = request.body

    contacts = contacts.map(contact => contact.id === contactId ? updatedContact : contact)
    response.status(200).json(updatedContact);
});

app.delete('/contacts/:id', (request, response) => {
    const contactId = parseInt(request.params.id);
    var contactFound = false;

    if (contacts.find(contact => contact.id === contactId)) {
        contacts = contacts.filter(contact => contact.id !== contactId);
        response.status(204).json();
    }
    else {
        response.status(404).json(`The requested resource with an id of ${contactId} could not be located.`)
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
}); 
