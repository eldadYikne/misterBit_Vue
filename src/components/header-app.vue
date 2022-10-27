 <template>
  <div class="header">
 <h1>misterBit</h1>

    <nav v-if="!isSignuoPage">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>

      <RouterLink @click="onLogOut" to="/signup">Logout</RouterLink>
    </nav>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      user: null,
      isSignuoPage: false,
    };
  },
  created() {
    this.user = this.$store.getters.user;
  },
  methods: {
    onLogOut() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  watch: {
    "$route.path"() {
      if (this.$route.path === "/signup") {
        this.isSignuoPage = true;
      } else {
        this.isSignuoPage = false;
      }
    },
  },
};
</script>

