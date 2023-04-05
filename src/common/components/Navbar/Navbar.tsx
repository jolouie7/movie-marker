import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  HStack,
  Container,
  ButtonGroup,
  Button,
  IconButton,
  chakra,
  useDisclosure,
  useColorModeValue,
  VStack,
  CloseButton,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import { IoHome } from "react-icons/io5";
import { useBreakpointValue } from "@chakra-ui/react";

interface NavbarProps {
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ onHandleChange }: NavbarProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    // <Flex
    //   alignItems="center"
    //   bg="gray.100"
    //   px={16}
    //   py={4}
    //   justify="space-between"
    //   direction={{ base: "column", md: "row" }}
    // >
    //   <Box mt={{ base: "4", md: "0" }}>Movie Marker</Box>
    //   <Flex alignItems="center" justify="center" my={{ base: "4", md: "0" }}>
    //     <ul>
    //       <li>
    //         <Link href="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link href="/bookmarks">Bookmarks</Link>
    //       </li>
    //     </ul>
    //   </Flex>
    //   <Box mb={{ base: "4", md: "0" }}>
    //     <InputGroup>
    //       <InputLeftElement pointerEvents="none">
    //         <SearchIcon />
    //       </InputLeftElement>
    //       <Input
    //         type="text"
    //         placeholder="Search..."
    //         onChange={onHandleChange}
    //       />
    //     </InputGroup>
    //   </Box>
    // </Flex>

    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" variant="ghost">
                  Home
                </Button>
                <Button w="full" variant="ghost">
                  Home
                </Button>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Movie Marker"
              display="flex"
              alignItems="center"
            >
              <Box>Movie Marker</Box>
            </chakra.a>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Button variant="ghost" size="sm">
                Home
              </Button>
              <Button variant="ghost" colorScheme="brand" size="sm">
                Bookmarks
              </Button>
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input placeholder="Search..." onChange={onHandleChange} />
            </InputGroup>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              variant="ghost"
              icon={<HamburgerIcon />}
              // onClick={mobileNav.onOpen}
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Movie Marker</DrawerHeader>
                <Link href="/">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    aria-label={"Home button"}
                    leftIcon={<Icon as={IoHome} />}
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/bookmarks">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    aria-label={"Bookmarks button"}
                    leftIcon={<StarIcon />}
                  >
                    Bookmarks
                  </Button>
                </Link>
              </DrawerContent>
            </Drawer>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;
