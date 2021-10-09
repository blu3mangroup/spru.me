<template>
  <Layout>

      <p style="color: var(--spreen); width: 100%; text-align: center; font-weight: bold;">"+" = has variants</p>
      <FilterBar @filterChange="imageRefresh" />
      <Container :filters="filters" />

  </Layout>
</template>

<script>
import FilterBar from "~/components/Gallery/Filters.vue"
import Container from "~/components/Gallery/Container.vue"

export default {
  components: {
    Container,
    FilterBar
  },
  metaInfo: {
    title: 'Gallery'
  },
  data () {
    return {
      filters: {}
    }
  },
  methods: {
    imageRefresh(filters) {
      this.filters = filters
    }
  }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/ninifont-2');

/*-- #quality:checked ~ .galleryBlock .galleryGrid figure {
  display: none;
}

#quality:checked ~ .galleryBlock .galleryGrid figure.Quality {
  display: block;
}

#naughty ~ .galleryBlock .galleryGrid figure.Naughty {
  display: none;
}

#naughty:checked ~ .galleryBlock .galleryGrid figure.Naughty {
  display: block;
} --*/
</style>