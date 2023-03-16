import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

const FullScreenContainer = ({ children }) => {
  return (
    <Container
      minH="100vh"
      maxW="100%"
      bgGradient={["linear(to-tr, teal.400, yellow.500)"]}
      p={0}
    >
      {children}
    </Container>
  );
};

FullScreenContainer.Body = function ({ children }) {
  return <Box>{children}</Box>;
};

FullScreenContainer.BelowCard = function ({ children }) {
  return <Box>{children}</Box>;
};

FullScreenContainer.Auth = function ({ children }) {
  return (
    <Flex minH="100vh" maxW="100%" alignItems={"center"} direction={"column"}>
      {children}
    </Flex>
  );
};

export default FullScreenContainer;
