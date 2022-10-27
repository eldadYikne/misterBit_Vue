import { createStore } from 'vuex'
import contact from './module/contact.js'
import user from './module/user.js'

const storeOptions = {
    strict: true,
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
  getters: {
        count(state){ return state.count }
    },
    modules:{
        contact,
        user
    }
}


const store = createStore(storeOptions)
export default store