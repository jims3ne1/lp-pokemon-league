<template>
  <div>
    <h2>Pokemon Detail</h2>
    <div v-if="pokemon">
      <p>{{ pokemon.name}}</p>
      <p>{{ pokemon.url}}</p>
    </div>
    <div v-else>
      <p>Select pokemon from line-up</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "pokemon-detail",
  props: ["pokemon"]
};
</script>

<style>
</style>