<template>
  <Layout>
    <Visualizer class="home" />
  </Layout>
</template>

<script>
import Visualizer from '~/components/Visualizer.vue'

export default {
  components: {
    Visualizer
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home {
  margin: auto;
  width: 80%;
  top: 20%;
  z-index: 0;
}

</style>
