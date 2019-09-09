<template>
  <div>
    <h2 class="has-text-weight-semibold">Pokemon Line Up</h2>
    <div class="pokemon-line-up">
      <div v-bind:key="pokemon.name" v-for="pokemon in pokemons">
        <PokemonLineUpItem
          v-bind:pokemon="pokemon"
          v-on:get-details="$emit('get-details', pokemon)"
          v-on:remove-from-lineup="$emit('remove-from-lineup', pokemon)"
        />
      </div>
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
  computed: {},
  props: ["pokemons"]
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