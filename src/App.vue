<template>
  <div id="app">
    <Header class="header" :class="( goneHome ? 'center' : 'top' )" />
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import Header from '~/components/Header.vue'
export default {
  created() {
      if (this.$route.path !== "/") {
          this.goneHome = false
      }
  },
  components: {
    Header
  },
  data() {
      return {
        goneHome: true
      }
  },
  watch: {
    $route(to) {
      if (to.path === "/") {
          this.goneHome = true
      } else {
          this.goneHome = false
      }
    }
  }
}
</script>

<style>
@import url('http://fonts.cdnfonts.com/css/ninifont-2');

.header {
    position: absolute;
    text-align: center;
    left: 50%;
    transform: translate(-50%, 0); 
    z-index: 10;
}

.center {
    top: 40%;
    transition: all 0.8s;
}
.top {
    top: 0%;
    transition: all 0.8s;
}
</style>
