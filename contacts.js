const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");
const { error } = require("console");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    return contact || null;
  } catch {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    //   const newContacts = contacts.filter((contact) => contact.id !== contactId);
    //   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    //   return newContacts;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: crypto.randomUUID() };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
