<template>
  <Layout>
    <article>

      <h1>Information:</h1>
      
      <p>
        This is fan-site web portal for artist <span style="color: var(--sprurple)">"sprume"</span>.
      </p>

      <g-image src="~/assets/pfp.png" />

      <p>
        Many people are starting to become fans of this enigmatic picture drawer, and we're finding out more and more about him everyday. You can find out alot about a man through his work which is a reflection of himself and it's a bit disgusting and very attractive.
      </p>

    </article>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>

<style scoped>
article {
  text-align: center;
}

article h1 {
    border-bottom: 1px solid var(--sprurple);
    width: 80%;
    margin: auto;
}

article p {
  width: 80%;
  margin: auto;
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
