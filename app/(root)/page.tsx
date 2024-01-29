import { fetchGenreMovies } from "@actions/movieData";
import { Genre } from "@lib/types";
import Hero from "@components/Hero";
import Navbar from "@components/Navbar";
import CategoryList from "@components/CategoryList";

const Home = async () => {
  const genres: Genre[] = await fetchGenreMovies();
  const genresMovies = genres.slice(0, 4);

  return (
    <div className="relative pb-10">
      <Navbar />
      <Hero />
      <div className="all-movies">
        {genresMovies.map((genre: Genre) => (
          <CategoryList key={genre.id} title={genre.name} movies={genre.movies} />
        ))}
      </div>
    </div>
  );
};

export default Home;
