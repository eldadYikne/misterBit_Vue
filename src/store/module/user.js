import { storageService } from "../../service/storage.service"
import { userService } from "../../service/user.service"

export default {
    state: {
        users: storageService.load('userDB') || [],
        user: storageService.load('loggedinUser') || null

    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        signupUser(state, { user }) {
            state.user = user

        },
        logout(state) {
            state.user = null
        },
        transfer(state, { sum }) {
            if (state.user.balance < sum) return
            state.user.balance -= sum
        },
        transactions(state,{transactions}){
            console.log('transactionsUser',transactions)
            
            state.user.transactions.push(transactions)
        }

    },
    actions: {
        async loadUsers({ commit }) {
            const users = userService.loadUsers()
            commit({ type: 'setUsers', users })
        },
        async signupUser({ commit }, { newUser }) {
            console.log(newUser);
            const user = userService.signupUser(newUser)
            commit({ type: 'signupUser', user })
        },
        logout({ commit }) {
            userService.logout()
            commit({ type: 'logout' })

        },
        async transfer({ commit }, { payload }) {
            await userService.transfer(payload)
            commit({ type: 'transfer', sum: payload.sum })

        },
        async transactions({ commit }, { payload }) {
            console.log(payload);
            const transactions=  await userService.transactions(payload.toContact,payload.sum)
            commit({ type: 'transactions', transactions })

        }

    },
    getters: {
        user(state) {
            return state.user
        },
        users(state) {
            return state.users
        }
    }
}