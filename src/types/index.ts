export interface Movie {
  id: number
  title: string
  tmdb_id: number
  imdb_id: string
  followers: number
  production_year: number
  poster: string
}

export interface SearchData {
  id: number
  release_date: number
  poster: string
  title: string
}
