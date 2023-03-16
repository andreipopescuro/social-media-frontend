import {
  Avatar,
  AvatarGroup,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Likes = ({ post }) => {
  return (
    <>
      <Box display="flex" justifyContent="center">
        {post?.likes.length > 0 ? (
          <AvatarGroup size="sm" max={10}>
            {post?.likes.map((like) => (
              <Link to={`/${like.user._id}`} key={like._id}>
                <Avatar
                  name={like.user.name}
                  src={like.user.pic}
                  key={like._id}
                />
              </Link>
            ))}
          </AvatarGroup>
        ) : (
          <Text>This post has no likes</Text>
        )}
      </Box>
    </>
  );
};

export default Likes;
