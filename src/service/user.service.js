import { contactService } from "./contact.service"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"


export const userService = {
    transfer,
    signupUser,
    loadUsers,
    logout,
    transactions,
    getDefaultUser
}

const gUsers = [
    {
        name: "Puki Ben David",
        balance: 100,
        _id: utilService.makeId(),
        email:"Puki@gamil.com",

        transactions: [
            {
                toId: "d99e3u2ih329",
                to: "Moshiko",
                at: 2652712571,
                amount: 2
            },
        ]
    },
    {
        _id: utilService.makeId(),
        name: "Dekel Ben David",
        email:"DekelBen@gamil.com",
        balance: 100,
        transactions: [
            {
                toId: "d99e3u5ih329",
                to: "Moshiko",
                at: 2652712571,
                amount: 2
            },
        ]
    },
    {
        _id: utilService.makeId(),
        name: "eldady",
        balance: 100,
        email:"eldadd@gamil.com",

        transactions: [
            {
                toId: "d99easd3u5ih329",
                to: "Moshiko",
                at: 2652712571,
                amount: 2
            },
        ]
    },
]

function transfer(payload) {
    var contacts = storageService.load('contactDB')
    if (payload.fromContact.balance > payload.sum && payload.fromContact.balance > 0) {
        const toContact = payload.toContact
        toContact.balance += payload.sum
        const toContactIdx = contacts.findIndex(contact => contact._id === toContact._id)

        const fromContact = { ...payload.fromContact }
        fromContact.balance -= payload.sum
        const fromContactIdx = contacts.findIndex(contact => contact._id === fromContact._id)

        const newContantToUpdet = { ...fromContact }
        contacts.splice(fromContactIdx, 1, newContantToUpdet)
        contacts.splice(toContactIdx, 1, toContact)

        storageService.save('loggedinUser', newContantToUpdet)
        storageService.save('contactDB', contacts)
    } else {
        console.log('you not has money');
    }

}
function getDefaultUser() {
    const defaultUser= {
        _id: utilService.makeId(),
        name: "eldad",
        email:"eldad@gamil.com",
        balance: 100,
        transactions: [
            {
                toId: "d99easd3u5ih329",
                to: "Moshiko",
                at: 2652712571,
                amount: 2
            },
        ]

    }
    const username= {email:defaultUser.email  ,username:defaultUser.name}
    signupUser(username)
    return defaultUser
}
function transactions(contact,sum) {
    return new Promise((resolve, reject) => {
        const fromContantToUpdet = { ...contact }
        const date = _getDate()
        const fromContactTransactions = _newTransactions(fromContantToUpdet._id, fromContantToUpdet.name, date, sum, fromContantToUpdet.balance)
       const currUser=storageService.load('loggedinUser')
        if(contact._id !== currUser._id){
            var contacts = storageService.load('contactDB')
            const fromContactIdx = contacts.findIndex(contact => contact._id === fromContantToUpdet._id)       
            if(!fromContantToUpdet.transactions) fromContantToUpdet.transactions=[]
            fromContantToUpdet.transactions=[...fromContantToUpdet.transactions,fromContactTransactions]
            contacts.splice(fromContactIdx, 1, fromContantToUpdet)
            storageService.save('contactDB', contacts)
        }

        resolve(fromContactTransactions)
    })
}

function _getDate() {
    const date = new Date()
    const minutes =
        date.getMinutes() > 9
            ? date.getMinutes()
            : `0${date.getMinutes()}`;
    const seconds =
        date.getSeconds() > 9
            ? date.getSeconds()
            : `0${date.getSeconds()}`;
    const currDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    const time = `${date.getHours()}:${minutes}:${seconds}`;
    const res = `${currDate},  ${time}  `
    return res
}
function _newTransactions(toId, to, date, amount, coinLeft) {
    return {
        toId,
        to,
        at: date,
        amount,
        coinLeft,
    }
}
function loadUsers() {
    return new Promise((resolve, reject) => {
        const users = storageService.load('userDB') || gUsers
        storageService.save('userDB', users)
        console.log(users);
        resolve(users)
    })
}

function signupUser(newUser) {
    return new Promise((resolve, reject) => {
        console.log('newUser', newUser)
        const users = storageService.load('userDB') || gUsers
        let user = users.find(user => user.name === newUser.username)
        if (!user) {
            user = _getEmptyUser(newUser.username, newUser.email)
            console.log(user);
            users.push(user)
            _getContacts(user)
        }
        storageService.save('userDB', users)
        storageService.save('loggedinUser', user)

        resolve(user)
    })
}
async function _getContacts(user) {
    await contactService.getContacts()
    var contacts = storageService.load('contactDB')
    contacts.push(user)
    storageService.save('contactDB', contacts)
    return contacts

}

function logout() {
    storageService.save('loggedinUser', null)

}
function _getEmptyUser(username, email) {
    return {
        _id: utilService.makeId(),
        name: username,
        email,
        balance: 1000,
        transactions: []
    }
}