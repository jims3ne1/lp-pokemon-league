import axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

async function getPokemons() {
    const { data } = await instance.get("/pokemon?limit=100")
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

async function getPokemonEvolution(id) {
    const { data } = await instance.get(`/evolution-chain/${id}`)
    console.log('pokeAPI: evolution-chain', id)
    return data
}

export default { getPokemons, getPokemonSpecies, getPokemonStats, getPokemonEvolution }
