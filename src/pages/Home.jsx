import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Stack } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Main from "../components/Main";
const Home = () => {
  return (
    <Stack direction="column" height="100vh">
      <Nav />
      <Main />
    </Stack>
  );
};

export default Home;
