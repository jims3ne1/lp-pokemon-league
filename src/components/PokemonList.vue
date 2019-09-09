<template>
  <div>
    <h2 class="has-text-weight-semibold">Select pokemons here...</h2>
    <div class="pokemon-list">
      <PokemonListItem
        v-bind:key="pokemon.name"
        v-for="pokemon in pokemons"
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

<style scoped>
.pokemon-list {
  height: 500px;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  padding: 15px 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}
</style>