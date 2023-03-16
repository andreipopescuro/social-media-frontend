import { Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import ProfilePosts from "../UserProfile/ProfilePosts";
const MiddlePannel = ({ onProfile }) => {
  const [isSmallerThanMedium] = useMediaQuery("(max-width: 768px)");
  return (
    <Box
      flex={3}
      bg="whiteAlpha.300"
      borderRadius={10}
      overflow={isSmallerThanMedium && onProfile ? "" : "auto"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={3}
      gap={2}
    >
      <CreatePost />
      {onProfile ? <ProfilePosts /> : <Posts />}
    </Box>
  );
};

export default MiddlePannel;
