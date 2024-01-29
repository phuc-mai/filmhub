import { fetchTrending } from "@actions/movieData";
import HeroCard from "./HeroCard";

const Hero = async () => {
  const trending = await fetchTrending();
  const randomNumber = Math.floor(Math.random() * trending.length);
  const movie = trending[randomNumber];

  return (
    <HeroCard movie={movie} />
  );
};

export default Hero;
