 <template >
  <div class="contact-list-container">
    <ContactFilter v-on:filter="onFilter" />
    <div class="contact-list">
      <TransitionGroup name="list" tag="ul">
        <div v-for="contact in contactsToShow" v-bind:key="contact._id">
          <ContactPreview
            v-on:remove-contact="onRemoveContact"
            v-bind:contact="contact"
          />
        </div>
      </TransitionGroup>
    </div>
    <div>
      <RouterLink to="/contact/edit">
        <button class="button green">+New contact</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import ContactPreview from "./contact-preview.vue";
import ContactFilter from "./contact-filter.vue";

export default {
  data() {
    return {
      filterBy: {},
    };
  },
  async created() {
    this.$store.dispatch({ type: "loadContacts" });
    console.log(this.contacts);
  },
  methods: {
    async onRemoveContact(contactId) {
      this.$store.dispatch({ type: "removeContact", contactId });
    },
    onFilter(filterBy) {
      console.log("filterBy", filterBy);
      this.filterBy = filterBy;
    },
  },
  computed: {
    contactsToShow() {
      const regex = new RegExp(this.filterBy.text, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
    },
    contacts() {
      return this.$store.getters.contacts;
    },
  },
  components: { ContactPreview, ContactFilter },
};
</script>
