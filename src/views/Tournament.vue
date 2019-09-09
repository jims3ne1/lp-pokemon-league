<template>
  <div>
    <h1>Tournament</h1>
    <PokemonLineUp
      v-bind:pokemons="pokemon_lineup"
      v-on:get-details="getDetails"
      v-on:remove-from-lineup="removeFromLineUp"
    />
    <PokemonDetail v-bind:pokemon="pokemon_detail"></PokemonDetail>
    <PokemonList v-bind:pokemons="pokemons" v-on:add-to-lineup="addToLineUp"></PokemonList>
  </div>
</template>

<script>
import PokemonLineUp from "../components/PokemonLineUp";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";
import axios from "axios";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2"
});

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
      pokemon_detail: null
    };
  },
  methods: {
    getPokemons() {
      pokeApi
        .get("/pokemon?limit=1000")
        .then(res => (this.pokemons = res.data.results))
        .catch(e => console.log(e));
    },

    getDetails(pokemon) {
      this.pokemon_detail = { ...pokemon };
    },

    addToLineUp(pokemon) {
      const found = this.pokemon_lineup.find(item => item.name == pokemon.name);
      if (found) {
        console.log(
          alert(
            `${found.name} is already in the line up. Please select another pokemon.`
          )
        );
      } else {
        this.pokemon_lineup = [...this.pokemon_lineup, pokemon];
      }
    },

    removeFromLineUp(pokemon) {
      this.pokemon_lineup = this.pokemon_lineup.filter(
        item => item.name != pokemon.name
      );

      if (this.pokemon_detail && this.pokemon_detail.name == pokemon.name) {
        this.pokemon_detail = null;
      }
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
