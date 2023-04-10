import React, { useRef } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  HStack,
  Button,
  IconButton,
  chakra,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/router";

interface NavbarProps {
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ onHandleChange }: NavbarProps) => {
  const bg = useColorModeValue("white", "gray.800");
  const router = useRouter();
  const isBookmarkRoute = router.pathname === "/bookmarks";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py="4"
        shadow="md"
        position="fixed"
        top="0"
        zIndex="200"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing="3" alignItems="center">
            <chakra.a
              href="/"
              title="Movie Marker"
              display="flex"
              alignItems="center"
              ml="4"
            >
              <Box>Movie Marker</Box>
            </chakra.a>

            <HStack spacing="3" display={{ base: "none", md: "inline-flex" }}>
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
              <Link href="/watched">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  aria-label={"Bookmarks button"}
                  leftIcon={<StarIcon />}
                >
                  Watched
                </Button>
              </Link>
            </HStack>
          </HStack>

          <HStack spacing="3">
            {!isBookmarkRoute && (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input placeholder="Search..." onChange={onHandleChange} />
              </InputGroup>
            )}

            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              variant="ghost"
              icon={<HamburgerIcon />}
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
                <Link href="/watched">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    aria-label={"Bookmarks button"}
                    leftIcon={<StarIcon />}
                  >
                    Watched
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
