<template>
  <div class="item box" @click="$emit('add-to-lineup', pokemon)">
    <span class="has-text-centered">
      <img v-bind:src="image" width="50" />
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

.box:not(:last-child) {
  margin-bottom: 7px;
}
.item {
  width: 110px;
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 0;
}

.item:hover {
  background-color: lightgreen;
  cursor: pointer;
}
</style>