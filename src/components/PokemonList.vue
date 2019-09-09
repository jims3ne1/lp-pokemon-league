<template>
  <ul class="pokemon-list">
    <PokemonListItem
      v-bind:key="pokemon.name"
      v-for="pokemon in pokemons"
      v-bind:pokemon="pokemon"
      v-on:add-to-lineup="$emit('add-to-lineup', pokemon)"
    />
  </ul>
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

<style scoped>
.pokemon-list {
  height: 500px;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  padding: 5px 5px;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>