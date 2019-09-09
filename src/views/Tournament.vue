<template>
  <div class="container">
    <div class="has-text-centered">
      <div v-if="isCompleted">
        <img src="../assets/ash-fight.png" width="80" />
        <h1 class="title">You're line-up is now complete!</h1>
        <p class="subtitle">Just hit go, to proceed to face your opponent.</p>
        <a
          href="https://github.com/jimbocortes/lp-pokemon-league"
          class="button is-warning is-large"
        >I'm ready to fight</a>
      </div>
      <div v-else>
        <img src="../assets/ash.png" width="100" />
        <h1 class="title">You're fight is next!</h1>
        <p
          class="subtitle"
        >Choose your pokemon line-up, if you'll get confused, just follow your poke-heart ~.~</p>
      </div>
    </div>

    <div class="wrapper">
      <div class="columns">
        <div class="column is-two-thirds">
          <PokemonLineUp
            :selectedPokemon="pokemon_detail"
            v-bind:pokemons="pokemon_lineup"
            v-on:get-details="getDetails"
            v-on:remove-from-lineup="removeFromLineUp"
          />
          <PokemonDetail v-bind:pokemon="pokemon_detail"></PokemonDetail>
        </div>
        <div class="column">
          <PokemonList v-bind:pokemons="pokemons" v-on:add-to-lineup="addToLineUp"></PokemonList>
        </div>
      </div>
    </div>
  </div>
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
  computed: {
    isCompleted: function() {
      const compoleted = this.pokemon_lineup.length === 6 ? true : false;
      return compoleted;
    }
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
      if (this.pokemon_lineup && this.pokemon_lineup.length >= 6) {
        alert(
          "You have completed your line-up, you may remove some pokemons to add new ones."
        );
        return;
      }
      const found = this.pokemon_lineup.find(item => item.name == pokemon.name);
      if (found) {
        console.log(
          alert(
            `${found.name} is already in the line-up. Please select another pokemon.`
          )
        );
      } else {
        this.pokemon_lineup = [...this.pokemon_lineup, pokemon];
        this.getDetails(pokemon);
      }
    },

    removeFromLineUp(pokemon) {
      this.pokemon_lineup = this.pokemon_lineup.filter(
        item => item.name != pokemon.name
      );

      if (this.pokemon_detail && this.pokemon_detail.name == pokemon.name) {
        if (this.pokemon_lineup) {
          this.pokemon_detail = this.pokemon_lineup[
            this.pokemon_lineup.length - 1
          ];
        } else {
          this.pokemon_detail = null;
        }
      }
    }
  },
  created() {
    this.getPokemons();
  }
};
</script>

<style>
.wrapper {
  padding-top: 50px;
}
.columns {
  margin-top: 50px;
}

.container {
  padding-top: 30px;
}
</style>
