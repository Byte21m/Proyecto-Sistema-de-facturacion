import * as z from 'zod';
import { atom } from "nanostores";
import { contactSchema } from "./schemas";

/** @type {z.infer<typeof contactSchema>} */
let contactsArray = [];
export const contactStore = atom(contactsArray);

/**
 * Crea un nuevo contacto
 * @param {object} payload 
 * @param {string} payload.name - El nombre del contacto.
 * @param {string} payload.phone - El numero del contacto
 */
const addContact = (payload) => {
  const id = crypto.randomUUID();
  const newContact = { id, ...payload };
  const contacts = contactStore.get();
  const updatedContacts = contacts.concat(newContact);
  contactStore.set(updatedContacts);
}

/**
 * Obtiene los contactos
 */
const getContacts = () => {
  return contactStore.get();
}

/**
 * Elimina un contacto.
 * @param {string} id - El id del contacto a eliminar.
 */
const deleteContact = (id) => {
  const contacts = contactStore.get();
  const updatedContacts = contacts.filter(contact => contact.id !== id)
  contactStore.set(updatedContacts);
}

/**
 * Actualiza un contacto
 * @param {string} id - El id del contacto a actualizar
 * @param {object} payload - La informacion del contacto editado.
 * @param {string} payload.name - El nombre del contacto.
 * @param {string} payload.phone - El numero del contacto
*/
const updateContact = (id, payload) => {
  const contacts = contactStore.get();
  const updatedContacts = contacts.map(contact => {
    if (contact.id === id) {
      return {
        ...contact, 
        name: payload.name, 
        phone: payload.phone
      }
    } else {
      return contact;
    }
  });
  contactStore.set(updatedContacts);
}


/**
 * Guarda en el navegador
 */
const saveContactsInBrowser = () => {
  const contacts = contactStore.get();
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

/**
 * Obtener contactos del navegador
 */
const getContactsFromBrowser = () => {
  // 1. Convertir de JSON a Javascript
  const contactsFromBrowser = localStorage.getItem('contacts') ?? [];
  // 2. Reemplazar contacts con los contctos del navegador
  const contacts = JSON.parse(contactsFromBrowser)
  contactStore.set(contacts);
}

const contactsService = {
  addContact,
  getContacts,
  deleteContact,
  updateContact,
  saveContactsInBrowser,
  getContactsFromBrowser
}

export default contactsService;