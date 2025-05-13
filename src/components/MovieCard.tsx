import type { Movie } from '../interfaces/movie';
import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const favorite = isFavorite(movie);

    function onFavoriteClick() {
        if (isFavorite(movie)) removeFromFavorites(movie);
        else addToFavorites(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0] || 'N/A'}</p>
            </div>
        </div>
    );
}

export default MovieCard;
