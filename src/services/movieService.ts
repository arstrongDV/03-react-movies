import axios from "axios"

export const getMovies = async(query: string) => {
    const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
    return await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })
}