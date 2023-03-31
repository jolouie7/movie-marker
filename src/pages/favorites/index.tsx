import { useEffect, useState } from "react";
import Navbar from "@/common/components/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import DisplayMovies from "@/common/components/DisplayMovies/DisplayMovies";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

export default function Favorites() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("localStorageMovies") || "[]"));
  }, []);

  // TODO: FINISH THIS
  const handleRemoveFavorite = (movie: Movie) => {
    // setMovies([]);
    // localStorage.removeItem("localStorageMovies");
    console.log(movie);
  };
  return (
    <>
      <Navbar />
      <Box>
        <DisplayMovies
          movies={movies}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      </Box>
    </>
  );
}
