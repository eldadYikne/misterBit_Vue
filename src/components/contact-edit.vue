
<template>
  <div v-if="contact" class="contact-edit-container">
    <div class="edit-contact-img">
      <span>Edit {{ name }}</span>
      <div class="image-continer">
        <img v-bind:src="getImgUrl" />
      </div>
    </div>
    <div class="input-edit">
      <input class="input-name" type="text" v-model="name" />
   
      <button @click="onSaveContant" class="button green">Save</button>
 

      <RouterLink :to="`/contact/${contact._id}`">
        <button class="button red">Cencel</button>
      </RouterLink>
    </div>
  </div>
  <!-- ADD -->
  <div class="contact-edit-container add" v-else>
    <div class="input-container">
      <span>Name:</span> 
      <input class="input-name" type="text" v-model="name" />
      <span>  Email:</span> 
      <input class="input-name" type="text" v-model="email" />
      <span>Phone:</span> 
      <input class="input-name" type="text" v-model="phone" />
    </div>
    <div class="btn-container">
      <RouterLink to="/contact">
        <button @click="onSaveContant" class="button green">Save</button>
      </RouterLink>
        <RouterLink to="/contact">
            <button class="button red">Cencel</button>
        </RouterLink>
    </div>
  </div>
</template>

<script>
import { contactService } from "../service/contact.service";
export default {
  data() {
    return {
      contact: null,
      name: "",
      email: "",
      phone: "",
    };
  },
  created() {
    this.setContact();
  },
  methods: {
    async setContact() {
      const _id = this.$route.params.editId;
      if (_id) {
        const contact = await contactService.getContactById(_id);
        this.contact = contact;
        this.name = contact.name;
      }
    },
    async onSaveContant() {
      console.log('this.contact',this.contact)
      if (this.contact) {
        console.log('edit')
        this.contact.name = this.name;
        this.$store.dispatch({type:'saveContact',contact: this.contact })
        this.$router.back()
      } else {
        console.log('add');
        const contact = await contactService.getEmptyContact();
        contact.name = this.name;
        contact.email = this.email;
        contact.phone = this.phone;
        this.$store.dispatch({type:'saveContact',contact })
        this.$router.back()
      }
    },
  },
  computed: {
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.contact._id}@ashallendesign.co.uk`;
    },
  },
};
</script>

<style>
</style>