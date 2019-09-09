<template>
  <div>
    <button>{{ pokemon.name }}</button>
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