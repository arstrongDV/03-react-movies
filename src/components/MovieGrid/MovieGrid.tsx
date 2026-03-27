import React from 'react'
import css from './MovieGrid.module.css'
import type { Movie } from '../../types/movie'
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface MovieGrid {
    movies: Movie[];
    isLoading: boolean;
    isError: boolean;
    onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, isLoading, isError, onSelect }: MovieGrid) => {

    if(isLoading) return <Loader />
    if(isError) return <ErrorMessage />
    if(!movies) return;

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
      <li key={movie.id} onClick={() => onSelect(movie)}>
        <div className={css.card}>
          <img 
                className={css.image} 
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} 
                alt={`${movie.title}`}
                loading="lazy" 
              />
            <h2 className={css.title}>{movie.title}</h2>
        </div>
      </li>
    ))}
    </ul>
  )
}

export default MovieGrid
