import { useEffect, useState } from "react";
import Navbar from "@/common/components/Navbar/Navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import DisplayMovies from "@/common/components/DisplayMovies/DisplayMovies";
import { Movie } from "@/common/types/types";

export default function Bookmarks() {
  // TODO:
  // Remove the search bar from the navbar in bookmarks page because you can't search for movies in bookmarks page
  // It might be mistaken for searching through your bookmarks
  // TODO: Change name to bookmarks
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("localStorageMovies") || "[]"));
  }, []);

  const handleRemoveBookmark = (movie: Movie) => {
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
            handleRemoveBookmark={handleRemoveBookmark}
          />
        ) : (
          <Flex align="center" justify="center" mt="4">
            <Text>No movies in bookmarks</Text>
          </Flex>
        )}
      </Box>
    </>
  );
}
