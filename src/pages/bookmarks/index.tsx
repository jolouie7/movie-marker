import { useEffect, useState } from "react";
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

  const handleWatchMovie = (movie: Movie) => {
    try {
      // Get both localStorageMovies and localStorageWatchedMovies
      const localStorageMovies: Movie[] = JSON.parse(
        localStorage.getItem("localStorageMovies") || "[]"
      );
      const localStorageWatchedMovies: Movie[] = JSON.parse(
        localStorage.getItem("localStorageWatchedMovies") || "[]"
      );

      // Find the movie in localStorageMovies and remove it
      const movieToWatch = localStorageMovies.find(
        (localStorageMovie: Movie) => localStorageMovie.imdbID === movie.imdbID
      );
      const filteredMovies: Movie[] = localStorageMovies.filter(
        (localStorageMovie: Movie) => localStorageMovie.imdbID !== movie.imdbID
      );
      movieToWatch!.watched = true;

      // Update localStorageMovies and localStorageWatchedMovies
      localStorage.setItem(
        "localStorageMovies",
        JSON.stringify(filteredMovies)
      );
      localStorage.setItem(
        "localStorageWatchedMovies",
        JSON.stringify([...localStorageWatchedMovies, movieToWatch])
      );
      toast({
        title: `${movie.Title} added to watched.`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      setMovies(filteredMovies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box>
        {movies.length > 0 ? (
          <DisplayMoviesContent
            movies={movies}
            handleRemoveBookmark={handleRemoveBookmark}
            handleWatchMovie={handleWatchMovie}
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
