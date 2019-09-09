<template>
  <div>
    <h1>Tournament</h1>
    <PokemonLineUp></PokemonLineUp>
    <PokemonDetail></PokemonDetail>
    <PokemonList></PokemonList>
  </div>
</template>

<script>
import PokemonLineUp from "../components/PokemonLineUp";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";

export default {
  name: "tournament",
  components: {
    PokemonLineUp,
    PokemonDetail,
    PokemonList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
