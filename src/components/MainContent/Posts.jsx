import {
  Avatar,
  Badge,
  Box,
  Image,
  Skeleton,
  Tooltip,
  Tab,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../hooks/useQueryFunctions/posts";
import { Link } from "react-router-dom";

import PostCommBox from "./PostCommBox";
import Comments from "./Comments";
import Likes from "./Likes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddLike, useRemoveLike } from "../../hooks/useQueryFunctions/user";

const Posts = () => {
  const { user, feed } = useAuth();
  const { posts, isLoading, error } = usePosts(user.token, false, feed, null);
  const [isVerySmall] = useMediaQuery("(max-width: 500px)");
  const queryClient = useQueryClient();

  if (error) {
    return (
      <Text textAlign="center" color="red.500">
        An error occured
      </Text>
    );
  }

  const addLikeMutation = useMutation(
    (data) => {
      return useAddLike(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["/posts"]);
        queryClient.refetchQueries(["/posts/profile"]);
      },
    }
  );
  const removeLikeMutation = useMutation(
    (data) => {
      return useRemoveLike(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["/posts"]);
        queryClient.refetchQueries(["/posts/profile"]);
      },
    }
  );

  const handleAppreciatePost = (postId) => {
    if (addLikeMutation.isLoading) return;
    addLikeMutation.mutate({
      postId,
    });
  };

  const handleRemoveApreciatePost = (likeId) => {
    if (removeLikeMutation.isLoading) return;
    removeLikeMutation.mutate({
      likeId,
    });
  };

  return (
    <>
      {isLoading ? (
        <Stack w="90%">
          <SkeletonCircle
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
          />
          <SkeletonText
            noOfLines={2}
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
          />
          <Skeleton
            height="250px"
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
          />
        </Stack>
      ) : posts?.length > 0 ? (
        posts.map((post) => (
          <Box
            display="flex"
            gap={2}
            bg="whiteAlpha.300"
            borderRadius={4}
            p={2}
            w="90%"
            key={post._id}
          >
            <Box>
              <Link to={`/${post?.user?._id}`}>
                <Avatar src={post?.user?.pic} name={post?.user?.name} />
              </Link>
            </Box>
            <Box display="flex" flexDirection="column" flex={1} gap={1}>
              <Box display="flex" justifyContent="space-between">
                <Text fontWeight="bold">{post?.user?.name}</Text>
              </Box>
              <Stack direction="row">
                <Badge variant="outline">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Badge>
              </Stack>
              <Text>{post?.title}</Text>
              {post.image && (
                <Image
                  src={post.image}
                  alt="user image"
                  borderRadius={5}
                  maxH="300px"
                  w="100%"
                  objectFit="contain"
                />
              )}
              <Box display="flex" justifyContent="center">
                {post.liked.status ? (
                  <Button
                    leftIcon={<AiFillLike />}
                    bg="teal.800"
                    p={isVerySmall && 1}
                    _hover={{ bg: "yellow.500" }}
                    onClick={() => handleRemoveApreciatePost(post.liked.likeId)}
                    color="white"
                  >
                    Appreciated
                  </Button>
                ) : (
                  <Button
                    leftIcon={<AiFillLike />}
                    colorScheme="teal"
                    p={isVerySmall && 1}
                    onClick={() => handleAppreciatePost(post._id)}
                  >
                    Appreciate
                  </Button>
                )}
              </Box>
              <Tabs variant="soft-rounded" defaultIndex={-1} flex={1}>
                <TabList display="flex" justifyContent="center">
                  <Tooltip label="Likes">
                    <Tab>
                      <AiFillLike />
                      {`(${post?.likes?.length})`}
                    </Tab>
                  </Tooltip>
                  <Tooltip label="Comments">
                    <Tab>
                      <FaComments />
                      {`(${post?.comments?.length})`}
                    </Tab>
                  </Tooltip>
                  <Tooltip label="Close">
                    <Tab>
                      <AiOutlineClose />
                    </Tab>
                  </Tooltip>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Likes post={post} />
                  </TabPanel>
                  <TabPanel>
                    <Comments post={post} />
                  </TabPanel>
                  <TabPanel></TabPanel>
                </TabPanels>
              </Tabs>

              <PostCommBox postId={post._id} />
            </Box>
          </Box>
        ))
      ) : (
        <Text textAlign="center" color="whiteAlpha.500">
          Nothing to show...
        </Text>
      )}
    </>
  );
};

export default Posts;
