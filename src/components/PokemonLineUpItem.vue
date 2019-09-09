<template>
  <div class="item-wrapper">
    <div class="item box" @click="$emit('get-details', pokemon)">
      <span class="has-text-centered">
        <img v-bind:src="image" width="180" />
      </span>

      <small class="has-text-centered has-text-weight-semibold">@{{pokemon.name}}</small>
    </div>
    <button class="button is-small is-danger" @click="$emit('remove-from-lineup', pokemon)">Remove</button>
  </div>
  <!-- <div> -->
  <!-- <button @click="$emit('get-details', pokemon)">{{ pokemon.name }}</button> -->

  <!-- </div> -->
</template>

<script>
export default {
  name: "PokemonLineUpItem",
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
.item-wrapper {
  margin-bottom: 13px;
}

.delete {
  /* margin-top: -10px; */
}

.box:not(:last-child) {
  margin-bottom: 7px;
  margin-right: 7px;
}

.item {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item:hover {
  background-color: lightgreen;
  cursor: pointer;
}
</style>