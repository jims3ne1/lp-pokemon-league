<template>
  <div>
    <h2>Pokemon Line Up</h2>
    <div v-bind:key="pokemon.name" v-for="pokemon in pokemons">
      <PokemonLineUpItem v-bind:pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import PokemonLineUpItem from "./PokemonLineUpItem";

export default {
  name: "PokemonLineUp",
  components: {
    PokemonLineUpItem
  },
  props: ["pokemons"]
};
</script>

<style>
</style>