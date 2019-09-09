<template>
  <div class="item box" @click="$emit('add-to-lineup', pokemon)">
    <span>
      <img v-bind:src="image" width="96" />
    </span>

    <small class="has-text-centered has-text-weight-semibold">@{{pokemon.name}}</small>
  </div>
</template>

<script>
export default {
  name: "PokemonListItem",
  props: ["pokemon"],
  computed: {
    image: function() {
      const url = this.pokemon.url.toString();
      const rgx_result = url.match(/\d+/g);
      const id = rgx_result[1];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
  }
};
</script>

<style scoped>
/* .card {
  margin: 2px;
  min-width: 150px;
} */

.item {
  display: flex;
  flex-direction: column;
}

.item:hover {
  background-color: lightgreen;
  cursor: pointer;
}
</style>