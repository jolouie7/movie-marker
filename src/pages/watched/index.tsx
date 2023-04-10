/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import DisplayMoviesContent from "@/common/components/DisplayMoviesContent/DisplayMoviesContent";
import { Movie } from "@/common/types/types";

function WatchedMovies() {
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setWatchedMovies(
      JSON.parse(localStorage.getItem("localStorageWatchedMovies") || "[]")
    );
  }, []);

  return (
    <>
      {watchedMovies.length > 0 ? (
        <Box>
          <Flex align="center" justify="center" mb="4" fontSize="4xl">
            Watched Movies
          </Flex>
          <DisplayMoviesContent
            movies={watchedMovies}
            watchedMovie={(movie) => console.log(movie)}
          />
        </Box>
      ) : (
        <Flex align="center" justify="center" mt="4">
          <Text>You haven't watched any movies!</Text>
        </Flex>
      )}
    </>
  );
}

export default WatchedMovies;
