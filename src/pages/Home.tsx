import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../interfaces/movie';
import '../css/Home.css';
import { getPopularMovies, searchMovies } from '../services/api';

function Home() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const results = await getPopularMovies();
                setMovies(results);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch popular movies.');
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);

        try {
            const results = await searchMovies(searchQuery);

            setMovies(results);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to search movies.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
