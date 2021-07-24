import { API_KEY } from '@src/credentials'

export const movieAPIUrls: string[] = [
  `https://api.betaseries.com/movies/discover?key=${API_KEY}&type=popular&limit=10`,
  `https://api.betaseries.com/movies/discover?key=${API_KEY}&type=upcoming&limit=10`,
  `https://api.betaseries.com/movies/genres?key=${API_KEY}`,
]

export const buildGenderMovieUrls = (genders: string[]): string[] => {
  const genderList: string[] = []
  genders.forEach((gender) =>
    genderList.push(
      `https://api.betaseries.com/search/movies?key=${API_KEY}&genres=${gender}&limit=10`
    )
  )

  return genderList
}
