import {
  Box,
  Button,
  Slide,
  useDisclosure,
  Icon,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Search from "./Navbar/Search";
import LeftPannel from "./MainContent/LeftPannel";
import SettingsModal from "./MainContent/SettingsModal";
const SearchAndLeftPannel = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isVerySmall] = useMediaQuery("(max-width: 456px)");
  return (
    <>
      <Button
        onClick={onToggle}
        bg="transparent"
        _focus={{ bg: "teal.100" }}
        _hover={{ bg: "teal.100" }}
      >
        <Icon as={AiOutlineMenu} boxSize={5} />
      </Button>
      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }} ml={10} margin>
        <Box
          bgGradient={["linear(to-tr, teal.400, yellow.500)"]}
          p={0}
          w="100%"
          h="100vh"
          overflowY="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          py={7}
        >
          <>
            {isVerySmall && (
              <Flex gap={2}>
                <Search />
                <Button
                  onClick={onClose}
                  bg="transparent"
                  _focus={{ bg: "teal.100" }}
                  _hover={{ bg: "teal.100" }}
                >
                  <Icon as={AiOutlineClose} boxSize={5} />
                </Button>
              </Flex>
            )}

            {!isVerySmall && (
              <Button
                onClick={onClose}
                bg="transparent"
                _focus={{ bg: "teal.100" }}
                _hover={{ bg: "teal.100" }}
                alignSelf="end"
                marginRight="10%"
              >
                <Icon as={AiOutlineClose} boxSize={5} />
              </Button>
            )}

            <Box h={isVerySmall ? "500px" : "80%"} overflowY="scroll">
              <LeftPannel />
            </Box>

            <SettingsModal />
          </>
        </Box>
      </Slide>
    </>
  );
};

export default SearchAndLeftPannel;
