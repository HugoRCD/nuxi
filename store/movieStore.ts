import { defineStore } from "pinia";
import { Movie } from "~/types/movie";

interface MovieState {
  favoriteMovies: Movie[];
}

export const useMovieStore = defineStore("movie", {
  state: (): MovieState => ({
    favoriteMovies: [],
  }),
  getters: {
    getFavoriteMovies(): Movie[] {
      return this.favoriteMovies;
    },
  },
  actions: {
    isFavoriteMovie(movieId: number): boolean {
      return this.favoriteMovies.some((m) => m.id === movieId);
    },
    addFavoriteMovie(movie: Movie) {
      if (this.isFavoriteMovie(movie.id)) return;
      this.favoriteMovies.push(movie);
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(this.favoriteMovies)
      );
    },
    removeFavoriteMovie(movieId: number) {
      this.favoriteMovies = this.favoriteMovies.filter((m) => m.id !== movieId);
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(this.favoriteMovies)
      );
    },
    loadFavoriteMovies(movies: Movie[]) {
      this.favoriteMovies = movies;
    },
  },
});
