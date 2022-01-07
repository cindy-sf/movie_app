interface Notes {
  mean: number
  total: number
  user: number
}

export interface MovieDetailstype {
  id: number
  title: string
  original_title: string
  tmdb_id: number
  imdb_id: number
  url: string
  poster: string
  backdrop: string
  production_year: number
  release_date: number
  original_release_date: string
  sale_date: string
  director: string
  length: number
  genres: string[]
  synopsis: string
  tagline: string
  language: string
  notes: Notes
  followers: number
  comments: number
  similars: number
  characters: number
  trailer: string
  resource_url: string
  platform_links: []
  other_title: null | string
  errors: []
}

export interface MovieCharacters {
  actor: string
  id: number
  movie_id: number
  name: string
}

interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface SimilarMoviesResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SimilarMovies {
  page: number
  results: SimilarMoviesResult[]
  total_pages: number
  total_results: number
}
