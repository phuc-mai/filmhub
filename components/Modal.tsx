"use client";

import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Genre, Movie, Video } from "@lib/types";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

interface Props {
  movie: Movie;
  closeModal: () => void;
}

interface User {
  username: string;
  email: string;
  favorites: Movie[];
}

const Modal = ({ movie, closeModal }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };

  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );
        setVideo(data.videos.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  // ADD TO LIST

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`);
      const data = await res.json();
      setUser(data);
      setIsFavorite(data.favorites.find((item: Number) => item === movie.id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (session) getUser();
  }, [session]);

  const addToList = async () => {
    try {
      const res = await fetch(`/api/user/${user?.email}`, {
        method: "POST",
        body: JSON.stringify({ movieId: movie.id }),
      });
      const data = await res.json();
      setUser(data);
      setIsFavorite(data.favorites.find((item: Number) => item === movie?.id));
      router.refresh();
    } catch (error) {
      console.error("Error adding movie to list:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="modal">
      <button className="modal-close" onClick={closeModal}>
        <CancelRounded
          sx={{ color: "white", fontSize: "35px", ":hover": { color: "red" } }}
        />
      </button>

      <iframe
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
        loading="lazy"
        allowFullScreen
        className="modal-video"
      />

      <div className="modal-content">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-base-bold">Name:</p>
            <p className="text-base-light">{movie.name || movie.title}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-base-bold">Add to list</p>
            {isFavorite ? (
              <RemoveCircle
                onClick={addToList}
                className="cursor-pointer text-pink-1"
              />
            ) : (
              <AddCircle
                onClick={addToList}
                className="cursor-pointer text-pink-1"
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-base-bold">Release Date:</p>
          <p className="text-base-light">{movie?.release_date}</p>
        </div>

        <p className="text-base-light">{movie?.overview}</p>

        <div className="flex gap-2">
          <p className="text-base-bold">Rating:</p>
          <p className="text-base-light">{movie?.vote_average}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-base-bold">Genres</p>
          <p className="text-base-light">
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
