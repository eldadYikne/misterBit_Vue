 <template>
  <div  v-if="contact && user" >
    <div class="contact-details-container">
      <div class="image-continer">
        <img v-bind:src="getImgUrl" />
      </div>
      <div class="contact-details">
        <span> {{ contact.name }}</span>
        <span> {{ contact.email }} </span>
        <span> {{ contact.phone }}</span>
        <span v-if="contact.balance"> {{ contact.balance }}$</span>
      </div>
      <RouterLink to="/contact">
        <img class="go-back" v-bind:src="'../img/back.svg'" />
      </RouterLink>
      <div class="trasnfer-details">
        <RouterLink v-bind:to="`/contact/edit/${contact._id}`">
          <button class="button">Edit</button>
        </RouterLink>
        <span> Tranfer money to {{ contact.name }} </span>
        <TransferContact :user="user" v-on:transfer="onTransfer" />
      </div>
    </div>
    <div class="transition-container" v-if="contact.transactions">
      <div class="transition" v-for="transaction in contact.transactions" :key="transaction">
        <div class="at-to-container">
          <span class="to">To {{ transaction.to }}</span>
          <span class="at"> {{ transaction.at }}</span>
        </div>
        <div class="amount-container">
          <span class="amount">Amount: {{ transaction.amount }}$</span>
          <span class="coinLeft">Wallet: {{ transaction.coinLeft }}$</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from "../service/contact.service";
import TransferContact from "./transfer-contact.vue";
export default {
  data() {
    return {
      contact: null,
      user: null,
    };
  },
  created() {
    this.setContact();
    this.$store.dispatch({ type: "loadContacts" });
  },

  methods: {
    async setContact() {
      const contactId = this.$route.params.contactId;
      this.user = this.$store.getters.user;
      console.log('this.user',this.user)
      
      try {
        this.contact = await contactService.getContactById(contactId);
      } catch (err) {
        console.log(err);
      }
    },
    onTransfer(currContact) {
      this.contact = currContact;
    },
  },
  computed: {
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.contact._id}@ashallendesign.co.uk`;
    },
  },
  components: { TransferContact },
};
</script>

<style>
</style>