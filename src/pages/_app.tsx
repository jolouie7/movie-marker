import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "@/common/components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 10 } }, // Can refetch after 10 minutes
  });

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <Navbar onHandleChange={onHandleChange} />
        <Box mt="120">
          <Component {...pageProps} searchTerm={searchTerm} />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
