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
  handleWatchMovie?: (movie: Movie) => void;
  watchedMovie?: (movie: Movie) => void;
}

const DisplayMoviesContent = ({
  movies,
  handleAddBookmark,
  handleRemoveBookmark,
  handleWatchMovie,
}: DisplayMoviesContentProps) => {
  const router = useRouter();
  const isBookmarkRoute = router.pathname === "/bookmarks";

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
              {movie.watched === false && movie && (
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleWatchMovie!(movie)}
                >
                  {isBookmarkRoute && "Watched"}
                </Button>
              )}
              {isBookmarkRoute && movie ? (
                <Popover placement="top-start">
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
                        onClick={() => handleRemoveBookmark!(movie)}
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
