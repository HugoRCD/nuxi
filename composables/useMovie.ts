import { FetchMovieResponse, Movie } from "~/types/movie";

const useMovie = () => {
  const globalStore = useGlobalStore();
  const config = useRuntimeConfig().public.tmdb;
  const apiKey = config.apiKey;
  const baseUrl = "https://api.themoviedb.org/3";
  const language = "fr-FR";

  const popularMovies = ref(<Movie[]>[]);
  const topRatedMovies = ref(<Movie[]>[]);
  const comingSoonMovies = ref(<Movie[]>[]);
  const detailMovie = ref(<Movie>{});
  async function fetchPopularMovie() {
    globalStore.setLoading(true);
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}`;
    const response = await $fetch<FetchMovieResponse>(url);
    popularMovies.value = response.results;
    globalStore.setLoading(false);
  }
  async function fetchTopRatedMovie() {
    globalStore.setLoading(true);
    const url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}`;
    const response = await $fetch<FetchMovieResponse>(url);
    topRatedMovies.value = response.results;
    globalStore.setLoading(false);
  }
  async function fetchComingSoonMovie() {
    globalStore.setLoading(true);
    const url = `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=${language}`;
    const response = await $fetch<FetchMovieResponse>(url);
    comingSoonMovies.value = response.results;
    globalStore.setLoading(false);
  }
  async function fetchMovie(id: number) {
    globalStore.setLoading(true);
    const url = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=${language}`;
    const videoUrl = `${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=${language}`;
    detailMovie.value = await $fetch<Movie>(url);
    detailMovie.value.videos = await $fetch(videoUrl);
    globalStore.setLoading(false);
  }
  return {
    fetchPopularMovie,
    fetchTopRatedMovie,
    fetchComingSoonMovie,
    fetchMovie,
    popularMovies,
    topRatedMovies,
    comingSoonMovies,
    detailMovie,
  };
};

export default useMovie;
