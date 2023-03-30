import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

const Navbar = () => {
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
        <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Box mb={{ base: "4", md: "0" }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input type="text" placeholder="Search..." />
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default Navbar;
