import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

function Pagination({ currentPage, totalPages, goToPage }: PaginationProps) {
  const handlePrevClick = () => {
    if (currentPage <= 1) return;
    goToPage(currentPage - 1);
    window.scrollTo({
      top: 0,
    });
  };

  const handleNextClick = () => {
    if (currentPage >= totalPages) return;
    goToPage(currentPage + 1);
    window.scrollTo({
      top: 0,
    });
  };

  const handleFirstClick = () => {
    goToPage(1);
  };

  const handleLastClick = () => {
    goToPage(totalPages);
  };

  return (
    <Flex justifyContent="center" align="center" my="8" gap="2">
      <Button
        size="sm"
        colorScheme="blue"
        onClick={handleFirstClick}
        disabled={currentPage <= 1}
      >
        First
      </Button>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={handlePrevClick}
        disabled={currentPage <= 1}
      >
        Prev
      </Button>
      <Text fontSize="sm">{`Page ${currentPage} of ${totalPages}`}</Text>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={handleNextClick}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={handleLastClick}
        disabled={currentPage >= totalPages}
      >
        Last
      </Button>
    </Flex>
  );
}

export default Pagination;
