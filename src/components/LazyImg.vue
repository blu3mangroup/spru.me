<template>
  <img :src="target" />
</template>

<script>
export default {
  props: ['src'],
  data() {
    return {
        observer: null,
        intersected: false 
    }
  },
  computed: {
    target() {
      return this.intersected ? this.src : '';
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.intersected = true;
      }
    });
    this.observer.observe(this.$el);
  },
  unmounted() {
    this.observer.disconnect();
  }
}
</script>