import { fetchMyList } from "@actions/user";
import { fetchMovieDetails } from "@actions/movieData";
import Navbar from "@components/Navbar";
import MovieCard from "@components/MovieCard";

const MyList = async () => {
  const myList = await fetchMyList();

  const myListDetails = await Promise.all(
    myList.map(async (movieId: number) => {
      const details = await fetchMovieDetails(movieId); 
      return details;
    })
  );

  return (
    <>
      <Navbar />
      <div className="my-list">
        {myListDetails.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>{" "}
    </>
  );
};

export default MyList;
