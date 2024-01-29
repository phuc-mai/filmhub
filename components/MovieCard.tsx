"use client";

import { baseImgUrl } from "@constants";
import { Movie } from "@lib/types";
import { useState } from "react";
import Modal from "./Modal";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="movie-card" onClick={openModal}>
        <img
          src={
            movie.backdrop_path || movie.poster_path
              ? `${baseImgUrl}${movie.backdrop_path || movie.poster_path}`
              : "/assets/no-image.png"
          }
          className="thumbnail"
          alt={movie.title || movie.name}
        />
        <div className="border"></div>
      </div>

      {showModal && <Modal movie={movie} closeModal={closeModal} />}
    </>
  );
};

export default MovieCard;
