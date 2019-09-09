<template>
  <div>
    <h2>Pokemon List</h2>
    <div v-bind:key="pokemon.name" v-for="pokemon in pokemons">
      <PokemonListItem
        v-bind:pokemon="pokemon"
        v-on:add-to-lineup="$emit('add-to-lineup', pokemon)"
      />
    </div>
  </div>
</template>

<script>
import PokemonListItem from "./PokemonListItem";

export default {
  name: "PokemonList",
  components: {
    PokemonListItem
  },
  props: ["pokemons"]
};
</script>

<style>
</style>