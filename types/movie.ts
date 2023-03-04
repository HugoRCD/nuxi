interface genre {
  id: number;
  name: string;
}

interface production_companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface production_countries {
  iso_3166_1: string;
  name: string;
}

interface spoken_languages {
  name: string;
  iso_639_1: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: production_companies[];
  production_countries: production_countries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: spoken_languages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos?: {
    results: [
      {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        official: boolean;
        published_at: string;
        site: string;
        size: number;
        type: string;
      }
    ];
  };
}

export interface FetchMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
