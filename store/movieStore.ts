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
    addFavoriteMovie(movie: Movie) {
      this.favoriteMovies.push(movie);
      useLocalStorage("favoriteMovies", this.favoriteMovies);
    },
    removeFavoriteMovie(movie: Movie) {
      this.favoriteMovies = this.favoriteMovies.filter(
        (m) => m.id !== movie.id
      );
      useLocalStorage("favoriteMovies", this.favoriteMovies);
    },
    setFavoriteMovies(movies: Movie[]) {
      this.favoriteMovies = movies;
    },
  },
});
