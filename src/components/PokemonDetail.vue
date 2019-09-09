<template>
  <div>
    <h2>Pokemon Detail</h2>
    <p>{{ pokemon.name}}</p>
    <p>{{ pokemon.url}}</p>
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