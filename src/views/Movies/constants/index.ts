import { API_KEY, API_VERSION, MOVIE_DB_API_KEY } from '@src/credentials'

export const movieAPIUrls: string[] = [
  `https://api.themoviedb.org/${API_VERSION}/movie/upcoming?api_key=${MOVIE_DB_API_KEY}&language=fr`,
  `https://api.themoviedb.org/${API_VERSION}/movie/popular?api_key=${MOVIE_DB_API_KEY}&language=fr`,
  `https://api.themoviedb.org/${API_VERSION}/genre/movie/list?api_key=${MOVIE_DB_API_KEY}&language=fr`,
]

export const buildGenresMovieUrls = (genreIds: number[]): string[] => {
  const genderList: string[] = []
  genreIds.forEach((id) =>
    genderList.push(
      `https://api.themoviedb.org/${API_VERSION}/discover/movie?api_key=${MOVIE_DB_API_KEY}&language=fr&with_genres=${id}`
    )
  )

  return genderList
}
