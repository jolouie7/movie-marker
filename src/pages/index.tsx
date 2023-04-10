import Head from "next/head";
import { Box } from "@chakra-ui/react";
import MoviesContainer from "@/common/components/MoviesContainer/MoviesContainer";

interface HomeProps {
  searchTerm: string;
}

export default function Home({ searchTerm }: HomeProps) {
  return (
    <>
      <Head>
        <title>Movie Marker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box>
          <MoviesContainer searchTerm={searchTerm} />
        </Box>
      </main>
    </>
  );
}
