import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { VStack, Image, Box, Text, Flex, Wrap, Button } from "@chakra-ui/react";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
}

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://movie-database-alternative.p.rapidapi.com/",
        {
          params: {
            s: "spiderman",
            r: "json",
            page: 1,
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
          },
        }
      );
      setMovies(response.data.Search);
      return response.data.Search;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading, isError } = useQuery("movies", getMovies);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleAddFavorite = (movie: Movie) => {
    console.log("movie: ", movie.imdbID);
    const favoriteMovie: Movie = {
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbID: movie.imdbID,
    };
    const movies: Movie[] = JSON.parse(
      localStorage.getItem("localStorageMovies") || "[]"
    );
    // If 'movie' is not in localStorage, add it
    if (movies.length === 0) {
      localStorage.setItem(
        "localStorageMovies",
        JSON.stringify([favoriteMovie])
      );
    }
    // If 'movie' is in localStorage, add current movie to the array
    else {
      if (
        !movies.some(
          (storedMovie: Movie) => storedMovie.imdbID === movie.imdbID
        )
      ) {
        movies.push(favoriteMovie);
        localStorage.setItem("localStorageMovies", JSON.stringify(movies));
      } else {
        console.log("Movie already exists in favorites.");
      }
    }
  };

  return (
    <Wrap spacing={5} justify="center">
      {movies.map((movie) => (
        <VStack
          key={movie.imdbID}
          borderWidth="1px"
          borderRadius="md"
          width="100%"
          maxWidth="400px"
          maxHeight="400px"
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
              w="200px"
              h="200px"
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
              <Button fontSize="lg" onClick={() => handleAddFavorite(movie)}>
                Favorite
              </Button>
            </Flex>
          </Box>
        </VStack>
      ))}
    </Wrap>
  );
}

export default Movies;
