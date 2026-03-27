import { useEffect, useState } from 'react'
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import { getMovies } from '../../services/movieService';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import { Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async() => {
      if(!query) return;

      setIsLoading(true);
      try{
        const res = await getMovies(String(query));
        console.log(res);
        setMovies(res);

        if(res.length == 0){
          toast("No movies found for your request.")
        }
      } catch(err) {
        toast.error("Something went wrong!");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query])

  return (
    <div className={style.app}>
      <SearchBar onSubmit={setQuery} />
      {isLoading ? <Loader /> : isError ? <ErrorMessage /> : (
        <MovieGrid movies={movies} onSelect={(movie) => setSelectedMovie(movie)} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>
      )}

      <Toaster />
    </div>
  )
}

export default App;
