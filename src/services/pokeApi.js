import axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

async function getPokemons() {
    const { data } = await instance.get("/pokemon?limit=1000")
    console.log('pokeAPI: getPokemons')
    return data.results
}

async function getPokemonSpecies(id) {
    const { data } = await instance.get(`/pokemon-species/${id}`)
    console.log('pokeAPI: getPokemonSpecies', id)
    return data
}

async function getPokemonStats(id) {
    const { data } = await instance.get(`/pokemon/${id}`)
    console.log('pokeAPI: getPokemonStats', id)
    return data
}

export default { getPokemons, getPokemonSpecies, getPokemonStats }
