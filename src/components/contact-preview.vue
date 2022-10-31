 <template>
  <div class="contact-preview">
    <div class="contact-privete-details-container">
      <div class="image-contact-container">
        <img v-bind:src="getImgUrl" />
      </div>
      <div class="contact-name">
        <RouterLink v-bind:to="`/contact/${contact._id}`">  <span class="name">{{ contact.name }}</span>    </RouterLink>

        <span class="email">{{ contact.email }}</span>
      </div>
    </div>
    <div class="btn-container">
      <div class="bitcoin-container-preview" v-if="contact.balance" >
        <span>{{contact.balance}}$</span>
        <img  v-bind:src="'./img/Bitcoin.png'"/>
      </div>
      <button v-on:click="onRemoveContant">Remove</button>
      <button>
        <RouterLink v-bind:to="`/contact/${contact._id}`">
            Deatails

        </RouterLink>
    </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    onRemoveContant() {
      console.log(this.contact._id);
      this.$emit("remove-contact", this.contact._id);
    },
  },
  computed: {
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.contact._id}@ashallendesign.co.uk`;
    },
  

    
  },
};
</script>
