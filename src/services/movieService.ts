import axios from "axios"
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

export const getMovies = async(query: string): Promise<Movie[]> => {
    const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
    const res = await axios.get<MoviesResponse>(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })
    return res.data.results;
}