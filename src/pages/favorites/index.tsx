import { useEffect, useState } from "react";
import Navbar from "@/common/components/Navbar/Navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
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
    // When clicking on the 'Remove' button, remove the movie from localStorage and update the state
    console.log(movie);
    const filteredMovies: Movie[] = JSON.parse(
      localStorage.getItem("localStorageMovies") || "[]"
    ).filter(
      (localStorageMovie: Movie) => localStorageMovie.imdbID !== movie.imdbID
    );
    localStorage.setItem("localStorageMovies", JSON.stringify(filteredMovies));
    setMovies(filteredMovies);
  };
  return (
    <>
      <Navbar />
      <Box>
        {movies.length > 0 ? (
          <DisplayMovies
            movies={movies}
            handleRemoveFavorite={handleRemoveFavorite}
          />
        ) : (
          <Flex align="center" justify="center" mt="4">
            <Text>No movies in favorites</Text>
          </Flex>
        )}
      </Box>
    </>
  );
}
