import axios from "axios";
import { async } from "q";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

async function getPokemons() {
    const { data } = await instance.get("/pokemon?limit=1000")
    return data.results
}

async function getPokemonSpecies(id) {
    const { data } = await instance.get(`/pokemon-species/${id}`)
    return data
}

export default { getPokemons, getPokemonSpecies }
