import { getApiResponse } from "@lib/requests";

export const fetchTrending = async () => {
  const data = await getApiResponse("/trending/movie/week");
  const trending = data.results;

  return trending;
}

export const fetchGenreMovies = async () => {
  // Get the id of each movie genre to fetch movies in categories
  const data = await getApiResponse("/genre/movie/list");
  const genres = data.genres;

  for (const genre of genres) {
    const data = await getApiResponse(
      `/discover/movie?with_genres=${genre.id}`
    );

    // Add movies array to genre object --> For examples: { id: 28, name: 'Action', movies: [ ... ]},
    genre.movies = data.results;
  }
  return genres;
};

export const fetchMovieDetails = async (id: number) => {
  const movieDetails = await getApiResponse(`/movie/${id}?append_to_response=videos`);

  return movieDetails;
}

export const searchMovie = async (query: string) => {
  const data = await getApiResponse(`/search/movie?query=${query}`);
  return data.results;
}




