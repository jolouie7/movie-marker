import React from "react";
import {
  VStack,
  Image,
  Box,
  Text,
  Flex,
  Wrap,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Movie } from "@/common/types/types";
interface DisplayMoviesContentProps {
  movies: Movie[];
  handleAddBookmark?: (movie: Movie) => void;
  handleRemoveBookmark?: (movie: Movie) => void;
}

const DisplayMoviesContent = ({
  movies,
  handleAddBookmark,
  handleRemoveBookmark,
}: DisplayMoviesContentProps) => {
  const router = useRouter();
  const isBookmarkRoute = router.pathname === "/bookmarks";
  const displayWatchedButton = isBookmarkRoute ? "Watched" : null;

  const handleClickBookmark = isBookmarkRoute
    ? handleRemoveBookmark
    : handleAddBookmark;

  const handleRemove = (movie: any) => {
    console.log(movie.Title);
    handleRemoveBookmark!(movie);
  };

  return (
    <Wrap spacing="5" justify="center">
      {movies.map((movie) => (
        <VStack key={movie.imdbID} w={400}>
          {movie.Poster === "N/A" || movie.Poster === "" ? (
            <Image
              boxSize="300px"
              src="No_image_available.png"
              alt={movie.Title}
            />
          ) : (
            <Image
              boxSize="300px"
              src={movie.Poster}
              alt={movie.Title}
              objectFit="contain"
            />
          )}
          <Box p="4" w={300}>
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {movie.Title}
            </Text>
            <Flex align="center">
              <Text fontSize="lg" color="gray.500">
                {movie.Year}
              </Text>
            </Flex>
            <Flex justify="space-between">
              {displayWatchedButton && movie.watched === false && (
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleClickBookmark!(movie)}
                >
                  {displayWatchedButton}
                </Button>
              )}
              {isBookmarkRoute ? (
                <Popover>
                  <PopoverTrigger>
                    <Button size="sm" colorScheme="red">
                      Remove
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="semibold">
                      Are you sure you want to remove {movie.Title}?
                    </PopoverHeader>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleRemove(movie)}
                      >
                        Remove
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleAddBookmark!(movie)}
                >
                  Bookmark
                </Button>
              )}
            </Flex>
          </Box>
        </VStack>
      ))}
    </Wrap>
  );
};

export default DisplayMoviesContent;
