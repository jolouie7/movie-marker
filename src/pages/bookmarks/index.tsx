import { useEffect, useState } from "react";
import Navbar from "@/common/components/Navbar/Navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import DisplayMoviesContent from "@/common/components/DisplayMoviesContent/DisplayMoviesContent";
import { Movie } from "@/common/types/types";
import { useToast } from "@chakra-ui/react";

export default function Bookmarks() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const toast = useToast();

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
    toast({
      title: `${movie.Title} removed from Bookmarks.`,
      status: "success",
      duration: 7000,
      isClosable: true,
    });
  };
  return (
    <>
      <Navbar />
      <Box mt="100">
        {movies.length > 0 ? (
          <DisplayMoviesContent
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
