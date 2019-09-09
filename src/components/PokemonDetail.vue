
<template>
  <div>
    <h2>Pokemon Detail</h2>
    <div v-if="pokemon">
      <p>{{ pokemon.name}}</p>
      <p>{{ pokemon.url}}</p>
      <p v-if="description">Description: {{ description}}</p>
      <p>Types: {{ formattedStats.types }}</p>
      <p>Abilities: {{ formattedStats.abilities }}</p>
      <p>Height: {{ formattedStats.height }}</p>
      <p>Weight: {{ formattedStats.weight }}</p>
      <p>BaseXP: {{ formattedStats.base_experience}}</p>
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
      description: null,
      stats: null
    };
  },
  computed: {
    formattedStats: function() {
      let formattedStats = {
        types: [],
        height: "not available",
        weight: "not available",
        base_experience: "",
        abilities: []
      };

      if (this.stats) {
        formattedStats.types = this.stats.types.map(type => type.type.name);
        formattedStats.abilities = this.stats.abilities.map(
          ability => ability.ability.name
        );
        formattedStats.base_experience = this.stats.base_experience;
        formattedStats.height = `${this.stats.height / 10.0} m`;
        formattedStats.weight = `${this.stats.weight / 10.0} kg`;
      }

      return formattedStats;
    }
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
    },

    async getPokemonStats() {
      if (this.pokemon.hasOwnProperty("url")) {
        try {
          const url = this.pokemon.url.toString();
          const rgx_result = url.match(/\d/g);
          const id = rgx_result[1];
          const stats = await pokeApi.getPokemonStats(id);
          console.log(stats);
          this.stats = stats;
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
  watch: {
    pokemon: function() {
      this.getPokemonSpecies();
      this.getPokemonStats();
    }
  }
};
</script>

<style>
</style>