import { Avatar, Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Comments = ({ post }) => {
  return (
    <>
      {post?.comments.length > 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bg="whiteAlpha.400"
          borderRadius={5}
          gap={1}
          p={1}
          maxH="120px"
          overflow="auto"
        >
          {post?.comments.map((com) => (
            <Box
              display="flex"
              gap={2}
              w="100%"
              alignItems="center"
              bg="whiteAlpha.500"
              key={com._id}
            >
              <Link to={`/${com?.user?._id}`}>
                <Avatar
                  src={com?.user?.pic}
                  name={com?.user?.name}
                  boxSize={8}
                />
              </Link>
              <Text flex={1}>{com.title}</Text>
              <Badge>
                {new Date(com.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Badge>
            </Box>
          ))}
        </Box>
      ) : (
        <Text>This post has no comments</Text>
      )}
    </>
  );
};

export default Comments;
