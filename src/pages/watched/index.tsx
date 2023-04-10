import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import DisplayMoviesContent from "@/common/components/DisplayMoviesContent/DisplayMoviesContent";
import { Movie } from "@/common/types/types";
import { useToast } from "@chakra-ui/react";

function WatchedMovies() {
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const toast = useToast();

  useEffect(() => {
    setWatchedMovies(
      JSON.parse(localStorage.getItem("localStorageWatchedMovies") || "[]")
    );
  }, []);

  return (
    <>
      {watchedMovies.length > 0 ? (
        <Box>
          <Flex align="center" justify="center" mb="4">
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
