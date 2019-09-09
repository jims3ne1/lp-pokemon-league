<template>
  <div>
    <h2>Pokemon List</h2>
    <div v-bind:key="pokemon.name" v-for="pokemon in pokemons">
      <p>{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonList",
  props: ["pokemons"]
};
</script>

<style>
</style>