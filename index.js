import * as contacts from './contacts.js';
import { Command } from "commander";

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

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.log(allContacts)
            break;
        case "get":
            const getContactId = await contacts.getContactById(id);
            console.log(getContactId)
            break;
        case "add":
            const addContact = await contacts.addContact({name, email, phone});
            console.log(addContact);
            break;
        case "remove":
            const removeContact = await contacts.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.log("Unknown action type!")
    }
}


invokeAction(argv);