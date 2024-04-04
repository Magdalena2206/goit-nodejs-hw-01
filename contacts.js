import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'path';
import {nanoid} from 'nanoid';


const contactsPath = join('db', "contacts.json");

export const listContacts = async () => {
    const data = await readFile(contactsPath, "utf-8");
    const dataPars = JSON.parse(data)
    return dataPars;
}

export const getContactById = async (id) => {
    const contacts = await listContacts();
    const contactId = String(id)
    const contactsById = contacts.filter(contact => contact.id === contactId);
    return contactsById || null;
}

export const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
}

export const removeContact = async (id) => {
    const contacts = await listContacts();
    const contactId = String(id)
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1)
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}