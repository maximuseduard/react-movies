import { createContext, useState, useContext, useEffect } from 'react';
import type { Movie } from '../interfaces/movie';

interface MovieContextType {
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movie: Movie) => void;
    isFavorite: (movie: Movie) => boolean;
}

const MovieContext = createContext<MovieContextType>({
    favorites: [],
    addToFavorites: () => {},
    removeFromFavorites: () => {},
    isFavorite: () => false,
});

export function useMovieContext() {
    return useContext(MovieContext);
}

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
    const storedFavorites = () => {
        const storedFavorites = localStorage.getItem('favorites');

        if (storedFavorites) return JSON.parse(storedFavorites);

        return [];
    };

    const [favorites, setFavorites] = useState<Movie[]>(storedFavorites());

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie: Movie) => setFavorites((prev) => [...prev, movie]);
    const removeFromFavorites = (movie: Movie) => setFavorites((prev) => prev.filter((m) => m.id !== movie.id));

    const isFavorite = (movie: Movie) => favorites.some((m) => m.id === movie.id);

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
