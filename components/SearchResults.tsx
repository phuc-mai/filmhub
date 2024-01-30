import { searchMovie } from "@actions/movieData";
import MovieCard from "@components/MovieCard";
import { Movie } from "@lib/types";

const SearchResults = async ({ query }: { query: string }) => {
  let searchedMovies: Movie[] = [];
  searchedMovies = await searchMovie(query);

  return searchedMovies.length === 0 ? (
    <div>
      <h1 className="text-heading2-bold text-white">No results found</h1>
    </div>
  ) : (
    <div className="search-page">
      <h1 className="text-heading2-bold text-white">
        Search results for "{query}"
      </h1>

      <div className="my-list">
        {searchedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
