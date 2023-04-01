import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { VStack, Image, Box, Text, Flex, Wrap, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

interface DisplayMoviesProps {
  movies: Movie[];
  handleAddFavorite?: (movie: Movie) => void;
  handleRemoveFavorite?: (movie: Movie) => void;
}

const DisplayMovies = ({
  movies,
  handleAddFavorite,
  handleRemoveFavorite,
}: DisplayMoviesProps) => {
  const router = useRouter();
  const isFavoriteRoute = router.pathname === "/favorites";

  const DisplayButtonText = isFavoriteRoute ? "Remove" : "Favorite";
  const handleClickFavorite = isFavoriteRoute
    ? handleRemoveFavorite
    : handleAddFavorite;

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
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" color="gray.500">
                {movie.Year}
              </Text>
              <Button fontSize="lg" onClick={() => handleClickFavorite!(movie)}>
                {DisplayButtonText}
              </Button>
            </Flex>
          </Box>
        </VStack>
      ))}
    </Wrap>
  );
};

export default DisplayMovies;
