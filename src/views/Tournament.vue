<template>
  <section class="hero is-medium is-primary is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Tournament</h1>
        <p class="subtitle">It's time to choose your line up</p>

        <PokemonLineUp
          v-bind:pokemons="pokemon_lineup"
          v-on:get-details="getDetails"
          v-on:remove-from-lineup="removeFromLineUp"
        />
        <PokemonDetail v-bind:pokemon="pokemon_detail"></PokemonDetail>
        <PokemonList v-bind:pokemons="pokemons" v-on:add-to-lineup="addToLineUp"></PokemonList>
      </div>
    </div>
  </section>
</template>

<script>
import PokemonLineUp from "../components/PokemonLineUp";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";
import pokeApi from "../services/pokeApi.js";

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
    async getPokemons() {
      try {
        this.pokemons = await pokeApi.getPokemons();
      } catch (err) {
        console.log(err);
      }
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
</style>
