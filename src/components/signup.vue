<template>
  <div class="signup-page">
    <h1>Welcome to misterBit wallet!</h1>
    <div class="signup-container">
      <h1>Sign-up</h1>
      <input
        class="input-filter"
        type="text"
        v-model="username"
        placeholder="Enter name"
      />
      <input
        class="input-filter last-one"
        type="text"
        v-model="email"
        placeholder="Enter email"
      />
      <button @click="onSignup" class="button green">Login</button>
      <button @click="onSignup" class="button blue">Signup</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  async created() {
    this.$store.dispatch({ type: "loadUsers" });
  },
  methods: {
    async onSignup() {
      if (!this.username || !this.email) return;
      const newUser=  { username: this.username, email: this.email }
      this.$store.dispatch({ type: "signupUser",newUser});
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>