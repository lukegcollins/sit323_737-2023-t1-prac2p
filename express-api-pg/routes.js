const { emptyQuery } = require("pg-protocol/dist/messages");

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sit734_prac02",
    password: "PostgreSQL",
    port: 5432,
});

const getContacts = (request, response) => {
    pool.query("SELECT * FROM contact ORDER BY id ASC", (error, results) => {
        if (error) {
            console.error(
                `Error: Ohh No! The following error has occoured: ${error}`
            );
            response
                .status(503)
                .json(
                    `The server has encountered a situation it does not know how to handle.`
                );
            throw error;
        } else if (response == null) {
            response
                .status(200)
                .json(`Oops, Dosn't look like there are any contacts in the database.`);
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getContactById = (request, response) => {
    pool.query(
        "SELECT * FROM contact WHERE id = $1",
        [request.params.id],
        (error, results) => {
            if (error) {
                console.error(
                    `Error: Ohh No! The following error has occoured: ${error}`
                );
                response
                    .status(400)
                    .json(
                        `The server has encountered a situation it does not know how to handle.`
                    );
                throw error;
            } else if (results.rows == 0) {
                response
                    .status(404)
                    .json(
                        `The requested resource with an id of ${request.params.id} could not be located.`
                    );
            } else {
                response.status(200).json(results.rows);
            }
        }
    );
};

const createContact = (request, response) => {
    pool.query(
        "INSERT INTO contact (name, email, phone) VALUES ($1, $2, $3)",
        [request.body.name, request.body.email, request.body.phone],
        (error, results) => {
            if (error) {
                console.error(
                    `Error: Ohh No! The following error has occoured: ${error}`
                );
                response
                    .status(500)
                    .json(
                        `Looks like a bad request, please check your request and try again.`
                    );
                throw error;
            }

            response.status(201).send(`Contact added to the address book.`);
        }
    );
};

const updateContact = (request, response) => {
    pool.query(
        "UPDATE contact SET name = $1, email = $2, phone = $3 WHERE id = $4",
        [
            request.body.name,
            request.body.email,
            request.body.phone,
            request.params.id,
        ],
        (error, results) => {
            if (error) {
                console.error(
                    `Error: Ohh No! The following error has occoured: ${error}`
                );
                response
                    .status(500)
                    .json(
                        `Looks like a bad request, please check your request and try again.`
                    );
                throw error;
            } else if (results.rowCount != 1) {
                response
                    .status(404)
                    .json(
                        `The requested resource with an id of ${request.params.id} could not be located.`
                    );
            } else {
                response
                    .status(200)
                    .send(`Contact with ID of ${request.params.id} modified.`);
            }
        }
    );
};

const deleteContact = (request, response) => {
    pool.query(
        "DELETE FROM contact WHERE id = $1",
        [request.params.id],
        (error, results) => {
            if (error) {
                console.error(
                    `Error: Ohh No! The following error has occoured: ${error}`
                );
                response
                    .status(500)
                    .json(
                        `Looks like a bad request, please check your request and try again.`
                    );
                throw error;
            } else if (results.rowCount != 1) {
                response
                    .status(404)
                    .json(
                        `The requested resource with an id of ${request.params.id} could not be located.`
                    );
            } else {
                response
                    .status(204)
                    .send(`Contact with ID of ${request.params.id} removed.`);
            }
        }
    );
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
