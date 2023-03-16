import React from "react";
import Nav from "../components/Nav";
import About from "../components/UserProfile/About";
import LeftPannel from "../components/MainContent/LeftPannel";
import { Box, Stack, useMediaQuery } from "@chakra-ui/react";
import MiddlePannel from "../components/MainContent/MiddlePannel";
import ProfileInfo from "../components/UserProfile/ProfileInfo";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useQueryFunctions/user";
const UserPage = () => {
  const { user } = useAuth();

  const [isSmallerThanBig] = useMediaQuery("(min-width: 1076px)");
  const [isSmallerThanMedium] = useMediaQuery("(max-width: 768px)");

  return (
    <Stack direction="column" h="100vh">
      <Nav />
      <Box
        flex={1}
        mt={0}
        display="flex"
        p={3}
        gap={3}
        maxH={"90%"}
        overflow="auto"
        flexDirection={isSmallerThanMedium && "column"}
      >
        {isSmallerThanBig && <LeftPannel />}
        <Box display="flex" flexDirection="column" gap={3} flex={1}>
          <ProfileInfo />
          <About />
        </Box>
        <MiddlePannel onProfile={true} />
      </Box>
    </Stack>
  );
};

export default UserPage;
