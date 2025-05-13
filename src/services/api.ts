import type { Movie } from '../interfaces/movie';

const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${REACT_APP_TMDB_API_KEY}`);
    const data = await response.json();

    return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data.results;
};
