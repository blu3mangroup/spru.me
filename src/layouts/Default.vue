<template>
  <main>
      <slot/>
  </main>
</template>

<style>
main {
  width: 960px;
  margin: auto;
  margin-bottom: 4em;
}

@media screen and (max-width: 960px) {
  main {
    width: 98%;
  }
}
</style>
