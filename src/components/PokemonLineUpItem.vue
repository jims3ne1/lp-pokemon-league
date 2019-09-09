<template>
  <div>
    <button @click="$emit('get-details', pokemon)">{{ pokemon.name }}</button>
    <button @click="$emit('remove-from-lineup', pokemon)">x</button>
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