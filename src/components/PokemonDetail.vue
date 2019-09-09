
<template>
  <div>
    <h2>Pokemon Detail</h2>
    <div v-if="pokemon">
      <p>{{ pokemon.name}}</p>
      <p>{{ pokemon.url}}</p>
      <p v-if="description">{{ description}}</p>
    </div>
    <div v-else>
      <p>Select pokemon from line-up</p>
    </div>
  </div>
</template>

<script>
import pokeApi from "../services/pokeApi.js";

export default {
  name: "pokemon-detail",
  props: ["pokemon"],
  data() {
    return {
      description: null
    };
  },

  methods: {
    async getPokemonSpecies() {
      if (this.pokemon.hasOwnProperty("url")) {
        try {
          const url = this.pokemon.url.toString();
          const rgx_result = url.match(/\d/g);
          const id = rgx_result[1];
          const species = await pokeApi.getPokemonSpecies(id);
          this.description = species["flavor_text_entries"][1]["flavor_text"];
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
  beforeUpdate() {
    this.getPokemonSpecies();
  }
};
</script>

<style>
</style>