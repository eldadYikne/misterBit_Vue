
<template>
  <AppHeader />
  <div class="main-layout">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>


<script >
import AppHeader from "./components/header-app.vue";

export default {
  data() {},
  components: {
    AppHeader,
  },
};
</script>

