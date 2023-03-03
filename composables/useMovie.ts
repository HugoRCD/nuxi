import { FetchMovieResponse } from "~/types/movie";

const useMovie = () => {
  const config = useRuntimeConfig().public.tmdb;
  const apiKey = config.apiKey;
  const baseUrl = "https://api.themoviedb.org/3";
  const language = "fr-FR";
  async function fetchPopularMovie(): Promise<FetchMovieResponse> {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}`;
    return await $fetch(url);
  }
  async function fetchTopRatedMovie(): Promise<FetchMovieResponse> {
    const url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}`;
    return await $fetch(url);
  }
  async function fetchMovie(id: number): Promise<FetchMovieResponse> {
    const url = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=${language}`;
    return await $fetch(url);
  }
  return {
    fetchPopularMovie,
    fetchTopRatedMovie,
    fetchMovie,
  };
};

export default useMovie;
