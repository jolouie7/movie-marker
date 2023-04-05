import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

interface NavbarProps {
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ onHandleChange }: NavbarProps) => {
  return (
    <Flex
      alignItems="center"
      bg="gray.100"
      px={16}
      py={4}
      justify="space-between"
      direction={{ base: "column", md: "row" }}
    >
      <Box mt={{ base: "4", md: "0" }}>Movie Marker</Box>
      <Flex alignItems="center" justify="center" my={{ base: "4", md: "0" }}>
        {/* <Tabs>
          <TabList>
            <Tab>Home</Tab>
            <Tab>Bookmarks</Tab>
          </TabList>
        </Tabs> */}
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </Flex>
      <Box mb={{ base: "4", md: "0" }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            onChange={onHandleChange}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default Navbar;
