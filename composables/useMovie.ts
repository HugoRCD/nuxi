import { FetchMovieResponse, Movie } from "~/types/movie";

const useMovie = () => {
  const config = useRuntimeConfig().public.tmdb;
  const apiKey = config.apiKey;
  const baseUrl = "https://api.themoviedb.org/3";
  const language = "fr-FR";

  const popularMovies = ref(<Movie[]>[]);
  const topRatedMovies = ref(<Movie[]>[]);
  const detailMovie = ref(<Movie>{});

  async function fetchPopularMovie() {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}`;
    const response = await $fetch<FetchMovieResponse>(url);
    popularMovies.value = response.results;
  }
  async function fetchTopRatedMovie() {
    const url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}`;
    const response = await $fetch<FetchMovieResponse>(url);
    topRatedMovies.value = response.results;
  }
  async function fetchMovie(id: number) {
    const url = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=${language}`;
    detailMovie.value = await $fetch<Movie>(url);
  }
  return {
    fetchPopularMovie,
    fetchTopRatedMovie,
    fetchMovie,
    popularMovies,
    topRatedMovies,
    detailMovie,
  };
};

export default useMovie;
