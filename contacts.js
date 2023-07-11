const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

// Находим  все контакты
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
// Находим один контакт
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const rezult = contacts.find((contact) => contact.id === contactId);

  // если есть контакт с таким id, то вернуть контакт, иначе повернуть null
  return rezult || null;
};

// Добавляем контакт

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// удаляем контакт

const removeContact = async (contactId) => {
  // ищем индекс контакта зная его id
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
