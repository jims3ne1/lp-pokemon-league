<template>
  <div>
    <button @click="$emit('get-details', pokemon)">{{ pokemon.name }}</button>
  </div>
</template>

<script>
export default {
  name: "PokemonLineUpItem",
  props: ["pokemon"]
};
</script>

<style>
</style>