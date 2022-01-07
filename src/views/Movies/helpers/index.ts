import type { MoviesGenre } from '@src/types'

type MoviesGenreIds = MoviesGenre['id'][]
type MoviesGenreNames = MoviesGenre['name'][]

export const selectRandomMoviesGenre = (
  genresList: MoviesGenre[]
): {
  selectedGenresId: MoviesGenreIds
  selectedGenresNames: MoviesGenreNames
} => {
  const selectedGenresId: MoviesGenreIds = []
  const selectedGenresNames: MoviesGenreNames = []

  while (selectedGenresId.length !== 5) {
    const randomIndex = Math.floor(Math.random() * genresList.length)

    if (!selectedGenresId.includes(genresList[randomIndex].id)) {
      selectedGenresId.push(genresList[randomIndex].id)
      selectedGenresNames.push(genresList[randomIndex].name)
    }
  }

  return {
    selectedGenresId,
    selectedGenresNames,
  }
}
