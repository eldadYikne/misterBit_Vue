import { contactService } from "../../service/contact.service"

export default {
    state: {
        contacts: []
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1)
        },
        saveContact(state, { contact }) {
            console.log('state', state);
            const contactId = contact._id
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            console.log(idx);
            state.contacts.splice(idx, 1, contact)
        }
    },
    actions: {
        async loadContacts(context) {
            const contacts = await contactService.getContacts()            
            context.commit({ type: 'setContacts', contacts })
        },
        async removeContact(context, { contactId }) {
            await contactService.deleteContact(contactId);
            context.commit({ type: 'removeContact', contactId })
        },
        async saveContact(context, { contact }) {
            console.log('contact', contact)
            await contactService.saveContact(contact);
            context.commit({ type: 'saveContact', contact })
        }

    },
    getters: {
        contacts(state) { return state.contacts }
    }
}