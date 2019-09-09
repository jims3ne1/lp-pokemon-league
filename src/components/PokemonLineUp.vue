<template>
  <div>
    <h2 class="has-text-weight-semibold">
      Pokemon Line Up
      <span>{{ formattedCount }}/6</span>
    </h2>

    <div v-if="formattedCount > 0" class="pokemon-line-up">
      <div v-bind:key="pokemon.name" v-for="pokemon in pokemons">
        <PokemonLineUpItem
          :selectedPokemon="selectedPokemon"
          v-bind:pokemon="pokemon"
          v-on:get-details="$emit('get-details', pokemon)"
          v-on:remove-from-lineup="$emit('remove-from-lineup', pokemon)"
        />
      </div>
    </div>
    <div v-else class="pokemon-line-up">
      <h1 class="subtitle">Your pokemon line up will appear here.</h1>
    </div>
  </div>
</template>

<script>
import PokemonLineUpItem from "./PokemonLineUpItem";

export default {
  name: "PokemonLineUp",
  computed: {
    formattedCount: function() {
      let count = 0;
      if (this.pokemons) {
        count = this.pokemons.length;
      }

      return count;
    }
  },
  components: {
    PokemonLineUpItem
  },
  props: ["pokemons", "selectedPokemon"]
};
</script>
  
<style>
.pokemon-line-up {
  max-height: 600px;
  overflow: scroll;
  padding: 20px 20px;
  margin-top: 14px;
  box-shadow: inset 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  /* box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2); */
}
</style>