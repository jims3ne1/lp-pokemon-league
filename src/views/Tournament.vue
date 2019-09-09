<template>
  <div>
    <h1>Tournament</h1>
    <PokemonLineUp v-bind:pokemons="pokemon_lineup" v-on:get-details="getDetails"></PokemonLineUp>
    <PokemonDetail v-bind:pokemon="pokemon_detail"></PokemonDetail>
    <PokemonList v-bind:pokemons="pokemons" v-on:add-to-lineup="addToLineUp"></PokemonList>
  </div>
</template>

<script>
import PokemonLineUp from "../components/PokemonLineUp";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";

import pokemons from "../placeholder/json/pokemons";

export default {
  name: "tournament",
  components: {
    PokemonLineUp,
    PokemonDetail,
    PokemonList
  },
  data() {
    return {
      pokemons: [],
      pokemon_lineup: [],
      pokemon_detail: {}
    };
  },
  methods: {
    getPokemons() {
      this.pokemons = pokemons.results;
    },

    addToLineUp(pokemon) {
      this.pokemon_lineup = [...this.pokemon_lineup, pokemon];
    },

    getDetails(pokemon) {
      this.pokemon_detail = { ...pokemon };
    }
  },
  created() {
    this.getPokemons();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
