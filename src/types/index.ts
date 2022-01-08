export interface Movie {
  id: number
  title: string
  tmdb_id: number
  imdb_id: string
  followers: number
  production_year: number
  poster: string
  rate: number
}

export interface MoviesGenre {
  id: number
  name: string
}

export interface SearchData {
  id: number
  poster: string
  title: string
  rate?: number
}

export interface MovieDetails {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: null | object
  budget: number
  genres: MoviesGenre[]
  id: number
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  runtime: number | null
  homepage: string | null
  imdb_id: string | null
}

export interface MoviesResults {
  page: number
  results: MovieDetails[]
  total_results: number
  total_pages: number
}

export interface UpComingMovies {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: MovieDetails[]
}

interface KnowForMovie {
  poster_path: string | null
  adult: boolean
  overview: string
  release_date: string
  original_title: string
  genre_ids: number[]
  id: number
  media_type: string
  original_language: string
  title: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: number
  vote_average: number
}

interface KnowForShow {
  poster_path: string | null
  popularity: number
  id: number
  overview: string
  backdrop_path: string | null
  vote_average: number
  media_type: string
  first_air_date: string
  origin_country: string[]
  genre_ids: number[]
  original_language: string
  vote_count: number
  adult: boolean
  name: string
  original_name: string
}

export interface PeopleType {
  profil_path: string | null
  adult: boolean
  id: number
  name: string
  popularity: number
  profile_path: string | null
  know_for: KnowForMovie | KnowForShow
  gender: 0 | 2
}
