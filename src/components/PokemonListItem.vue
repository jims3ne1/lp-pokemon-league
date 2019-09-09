<template>
  <div>
    <button>{{ pokemon.name }}</button>
  </div>
</template>

<script>
export default {
  name: "PokemonListItem",
  props: ["pokemon"]
};
</script>

<style>
</style>