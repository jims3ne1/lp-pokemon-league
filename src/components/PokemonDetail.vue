
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
      <p>Evochain: {{ formattedEvolution }}</p>
      <p>Evochain: {{ evolution }}</p>
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
      stats: null,
      evolution: null
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
    },
    formattedEvolution: function() {
      let formattedEvolution = [];

      if (this.evolution) {
        let evoData = this.evolution.chain;

        do {
          let evoDetails = evoData["evolution_details"][0];

          formattedEvolution.push({
            species_name: evoData.species.name,
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            trigger_name: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item
          });

          evoData = evoData["evolves_to"][0];
        } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      }

      return formattedEvolution;
    }
  },
  methods: {
    async getPokemonSpecies(id) {
      try {
        const species = await pokeApi.getPokemonSpecies(id);
        this.description = species["flavor_text_entries"][1]["flavor_text"];
      } catch (err) {
        console.log(err);
      }
    },

    async getPokemonStats(id) {
      try {
        const stats = await pokeApi.getPokemonStats(id);
        this.stats = stats;
      } catch (err) {
        console.log(err);
      }
    },

    async getPokemonEvolution(id) {
      try {
        const evolution = await pokeApi.getPokemonEvolution(id);
        this.evolution = evolution;
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    pokemon: function() {
      if (this.pokemon.hasOwnProperty("url")) {
        const url = this.pokemon.url.toString();
        const rgx_result = url.match(/\d+/g);
        const id = rgx_result[1];

        this.getPokemonSpecies(id);
        this.getPokemonStats(id);
        this.getPokemonEvolution(id);
      }
    }
  }
};
</script>

<style>
</style>