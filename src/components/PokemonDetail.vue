
<template>
  <div class="section-wrapper">
    <div v-if="pokemon">
      <h1 class="has-text-weight-semibold title">
        {{ formattedName }}
        <b-tag class="tag" rounded v-bind:key="type" v-for="type in formattedStats.types">
          {{ type }}
          <br />
        </b-tag>
      </h1>

      <p>{{ description}}</p>

      <div class="columns">
        <div class="column">
          <div class="stats">
            <h1 class="has-text-weight-semibold subtitle">Evolution</h1>
            <div class="evolution-list">
              <div
                v-bind:key="evo.species_name"
                v-for="evo in formattedEvolution"
                class="evolution-item"
              >
                <div class="item box">
                  <span class="has-text-centered">
                    <img v-bind:src="evo.image_url" width="180" />
                  </span>

                  <small class="has-text-centered has-text-weight-semibold">@{{evo.species_name}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="stats">
            <p>
              <strong>Height:</strong>
              <br />
              {{ formattedStats.height }}
              <br />
              <br />
            </p>
            <p>
              <strong>Weight:</strong>
              <br />
              {{ formattedStats.weight }}
              <br />
              <br />
            </p>
            <p>
              <strong>Base XP:</strong>
              <br />
              {{ formattedStats.base_experience }}
              <br />
              <br />
            </p>
            <div>
              <strong>Abilities:</strong>
              <br />
              <b-tag
                class="tag"
                rounded
                v-bind:key="ability"
                v-for="ability in formattedStats.abilities"
              >{{ ability }}</b-tag>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
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
    formattedName: function() {
      return (
        this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)
      );
    },
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
            image_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getIdFromUrl(
              evoData.species.url
            )}.png`,
            url: evoData.species.url,
            species_name: evoData.species.name,
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            trigger_name: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item
          });

          evoData = evoData["evolves_to"][0];
        } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      }

      console.log(formattedEvolution);

      return formattedEvolution;
    }
  },
  methods: {
    getIdFromUrl(url) {
      const rgx_result = url.match(/\d+/g);
      const id = rgx_result[1];
      return id;
    },

    async getPokemonSpecies(id) {
      try {
        const species = await pokeApi.getPokemonSpecies(id);
        const en_descrition = species.flavor_text_entries.find(
          flavor => flavor.language.name == "en"
        );

        this.description = en_descrition.flavor_text;
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
        const species = await pokeApi.getPokemonSpecies(id);
        console.log("getPokemonEvolution", species.evolution_chain.url);
        const evolution_chain = species.evolution_chain;
        const evo_chain_id = this.getIdFromUrl(evolution_chain.url);
        console.log("getPokemonEvolutionID", evo_chain_id);
        this.evolution = await pokeApi.getPokemonEvolution(evo_chain_id);
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    pokemon: function() {
      if (this.pokemon.hasOwnProperty("url")) {
        const id = this.getIdFromUrl(this.pokemon.url);

        this.getPokemonSpecies(id);
        this.getPokemonStats(id);
        this.getPokemonEvolution(id);
      }
    }
  }
};
</script>

<style scoped>
.section-wrapper {
  margin-top: 20px;
  padding: 10px;
}

.stats {
  margin-top: 20px;
}

.tag {
  margin-right: 10px;
}

.item {
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
}

.evolution-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  /* align-items: center; */
  /* box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2); */
}
</style>