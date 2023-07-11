const contacts = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.table(listContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// // invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "drsAJ4SHPYqZeG-83QTVW" });
// invokeAction({
//   action: "add",
//   name: "Jon",
//   email: "Jon@mail.ua",
//   phone: "+38987456987",
// });
// invokeAction({ action: "remove", id: "e6ywwRe4jcqxXfCZOj_1e" });
