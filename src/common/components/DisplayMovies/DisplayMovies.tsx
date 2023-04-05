import React from "react";
import { VStack, Image, Box, Text, Flex, Wrap, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Movie } from "@/common/types/types";

interface DisplayMoviesProps {
  movies: Movie[];
  handleAddBookmark?: (movie: Movie) => void;
  handleRemoveBookmark?: (movie: Movie) => void;
}

const DisplayMovies = ({
  movies,
  handleAddBookmark,
  handleRemoveBookmark,
}: DisplayMoviesProps) => {
  const router = useRouter();
  const isBookmarkRoute = router.pathname === "/bookmarks";
  const displayWatchedButton = isBookmarkRoute ? "Watched" : null;

  const handleClickBookmark = isBookmarkRoute
    ? handleRemoveBookmark
    : handleAddBookmark;

  return (
    <Wrap spacing={5} justify="center">
      {movies.map((movie) => (
        <VStack
          key={movie.imdbID}
          borderWidth="1px"
          borderRadius="md"
          width="100%"
          maxWidth="400px"
        >
          {movie.Poster === "N/A" || movie.Poster === "" ? (
            <Image
              boxSize="200px"
              src="No_image_available.png"
              alt={movie.Title}
              w="100%"
              h="100%"
            />
          ) : (
            <Image
              boxSize="200px"
              src={movie.Poster}
              alt={movie.Title}
              objectFit="contain"
              w="100%"
              h="100%"
            />
          )}
          <Box p="4">
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {movie.Title}
            </Text>
            <Flex align="center">
              <Text fontSize="lg" color="gray.500">
                {movie.Year}
              </Text>
            </Flex>
            <Flex>
              <Button fontSize="sm" onClick={() => handleClickBookmark!(movie)}>
                {isBookmarkRoute ? "Remove" : "Bookmark"}
              </Button>
              {displayWatchedButton && movie.watched === false && (
                <Button
                  fontSize="sm"
                  onClick={() => handleClickBookmark!(movie)}
                >
                  {displayWatchedButton}
                </Button>
              )}
            </Flex>
          </Box>
        </VStack>
      ))}
    </Wrap>
  );
};

export default DisplayMovies;
