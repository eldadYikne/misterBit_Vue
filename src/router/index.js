import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/home-page.vue'
import ContactList from '../components/contact-list.vue'
import ContactDetails from '../components/contact-details.vue'
import ContactEdit from '../components/contact-edit.vue'
import Signup from '../components/signup.vue'
import Transfer from '../components/transfer-contact.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      
      path: '/',
      component: HomePage,
      meta: { transition: 'fade' },

    },
    {
      path: '/contact',
      component: ContactList,
      meta: { transition: 'fade' },
      

    },
    {
      path: '/transfer/:contactId',
      component: Transfer,
      meta: { transition: 'fade' },

    },
    {
      path: '/signup',
      component: Signup,
      meta: { transition: 'fade' },

    },
    {
      path: '/contact/:contactId',
      component: ContactDetails,
      meta: { transition: 'fade' },

    },
    {
      path: '/contact/edit/:editId?',
      component: ContactEdit,
      meta: { transition: 'fade' },
    },

  ]
})

export default router
