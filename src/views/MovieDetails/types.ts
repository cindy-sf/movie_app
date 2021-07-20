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
