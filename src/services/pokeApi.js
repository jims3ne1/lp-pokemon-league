import axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

async function getPokemons() {
    const { data } = await instance.get("/pokemon?limit=1000")
    return data.results
}

export default { getPokemons }
