import { searchMovie } from "@actions/movieData";
import MovieCard from "@components/MovieCard";
import { Movie } from "@lib/types";

const SearchResults = async ({ query }: { query: string }) => {
  let searchedMovie: Movie[] = [];
  searchedMovie = await searchMovie(query);

  return searchedMovie.length === 0 ? (
    <h1 className="search-page">No results found</h1>
  ) : (
    <div className="search-page">
      <h1>Search results for "{query}"</h1>

      <div className="my-list">
        {searchedMovie.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
