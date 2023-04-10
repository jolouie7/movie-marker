import React, { useEffect, useState } from "react";
import { Movie } from "@/common/types/types";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import DisplayMovies from "@/common/components/DisplayMovies/DisplayMovies";
import useDebounce from "@/common/hooks/useDebounce";
import Pagination from "@/common/components/Pagination/Pagination";
import { useMoviesQuery } from "@/common/hooks/useMoviesQuery";

interface MoviesProps {
  searchTerm: string;
}

function Movies({ searchTerm }: MoviesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearchQuery = useDebounce(searchTerm, 1000); // 1 second
  const toast = useToast();

  const { data, error, isLoading, isError } = useMoviesQuery(
    debouncedSearchQuery,
    currentPage
  );

  useEffect(() => {
    if (data) {
      const totalPages = Math.ceil(Number(data.totalResults) / 10); // 10 results per page
      setTotalPages(totalPages);
    }
  }, [data]);

  function handleGoToPage(page: number) {
    setCurrentPage(page);
  }

  const handleAddBookmark = (movie: Movie) => {
    console.log("movie: ", movie.imdbID);
    const favoriteMovie: Movie = {
      Title: movie.Title,
      Year: movie.Year,
      Type: movie.Type,
      Poster: movie.Poster,
      imdbID: movie.imdbID,
      watched: false,
    };
    const movies: Movie[] = JSON.parse(
      localStorage.getItem("localStorageMovies") || "[]"
    );

    // Add to bookmarks if it doesn't exist
    if (
      !movies.some((storedMovie: Movie) => storedMovie.imdbID === movie.imdbID)
    ) {
      movies.push(favoriteMovie);
      localStorage.setItem("localStorageMovies", JSON.stringify(movies));
      toast({
        title: `${favoriteMovie.Title} added to Bookmarks.`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Movie already exists in Bookmarks.",
        status: "info",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  if (isLoading)
    return (
      <Flex justify="center" align="center">
        <Spinner size="lg" />
      </Flex>
    );
  if (isError) return <div>Error: {(error as Error)?.message}</div>;

  return (
    <Box>
      {!data?.Search ? (
        <Flex align="center" justify="center" mt="4">
          Search Movies
        </Flex>
      ) : (
        <>
          <DisplayMovies
            movies={data.Search}
            handleAddBookmark={handleAddBookmark}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={handleGoToPage}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Movies;
