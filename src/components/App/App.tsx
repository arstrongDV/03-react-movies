import { useEffect, useState } from 'react'
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import { getMovies } from '../../services/movieService';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import { Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<FormDataEntryValue | null>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async() => {
      if(!query) return;

      setIsLoading(true);
      try{
        const res = await getMovies(String(query));
        console.log(res);
        setMovies(res.data.results);

        if(res.data.results.length == 0){
          toast("No movies found for your request.")
        }

        setIsLoading(false);
      } catch(err) {
        toast.error("Something went wrong!");
        setIsError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query])

  useEffect(() => {
    if(selectedMovie) setIsOpen(true);
  }, [selectedMovie])

  return (
    <div className={style.app}>
      <SearchBar setQuery={setQuery} />
      <MovieGrid movies={movies} isLoading={isLoading} isError={isError} onSelect={(movie) => setSelectedMovie(movie)} />

      {isOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setIsOpen(!isOpen)}/>
      )}

      <Toaster />
    </div>
  )
}

export default App;
