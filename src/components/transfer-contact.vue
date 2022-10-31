 <template>
  <div class="transfer-container" v-if="user">
    <form class="form" @submit="onTransfer">
      <input
        class="input-filter last-one transfer"
        type="number"
        v-model="sum"
        min="1"
        :max="max"
      />
      <span v-if="user.balance"
        >Yoh left <span class="left"> {{ user.balance }}$ </span>
      </span>

      <button class="button tranfer">Transfer</button>
    </form>
    <span class="red-messege" v-if="ShowMessge"
      >You dont have enogth money in wallet!
    </span>
  </div>
</template>

<script>
import { contactService } from "../service/contact.service";
export default {
    props:{
        user: {
            type: Object,
            required:true
        }
    },
  data() {
    return {
      toContact: null,
      sum: 0,
      max: "",
      ShowMessge: false,
    };
  },
  created(){
    this.setToContact();
    
  },
  methods: {
    async setToContact() {
      try {
        const _id = this.$route.params.contactId;
        this.toContact = await contactService.getContactById(_id);
        if (this.user.balance) {
          this.max = this.user.balance;
        }
      } catch (err) {
        console.log(err);
      }
    },
    onTransfer(ev) {
      ev.preventDefault();
      if (this.toContact._id === this.user._id) return;
      const payload = {
        sum: this.sum,
        toContact: this.toContact,
        fromContact: this.user,
      };
      this.getContact();
      this.$store.dispatch({ type: "transfer", payload });
      this.$store.dispatch({ type: "transactions", payload });
      this.$store.dispatch({ type: "transactionsTo", payload });

      if (this.user.balance < this.sum) {
        this.ShowMessge = true;
        setTimeout(() => {
          this.ShowMessge = false;
        }, 2000);
      }
    },
    async getContact() {
      try {
        const currContact = await contactService.getContactById(
          this.toContact._id
        );
        this.$emit("transfer", currContact);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>