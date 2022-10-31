import { contactService } from "../../service/contact.service"
import { userService } from "../../service/user.service"

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
        },
        transactionsTo(state, { transactions }) {
            const contactIdx = state.contacts.findIndex(contact => contact._id === transactions.toId)
            const newContact = state.contacts.find(contact => contact._id === transactions.toId)
            console.log('newContact',newContact)
            
            if (!newContact.transactions) newContact.transactions = []
            newContact.transactions.push(transactions)
            state.contacts.splice(contactIdx, 1, newContact)
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
        },
        async transactionsTo({ commit }, { payload }) {
            const transactions = await userService.transactions(payload.toContact, payload.sum)
            commit({ type: 'transactionsTo', transactions })

        }


    },
    getters: {
        contacts(state) { return state.contacts }
    }
}