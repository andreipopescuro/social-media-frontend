import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Image,
  Input,
  Menu,
  MenuItem,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  MenuList,
  MenuButton,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import PostCommBox from "../MainContent/PostCommBox";
import Comments from "../MainContent/Comments";
import Likes from "../MainContent/Likes";
import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../hooks/useQueryFunctions/posts";
import { Link, useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { AiOutlineGlobal, AiOutlineUsergroupDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useDeletePost,
  useUpdatePostVisibility,
} from "../../hooks/useQueryFunctions/posts";
import { useAddLike, useRemoveLike } from "../../hooks/useQueryFunctions/user";

const ProfilePosts = () => {
  const { user, feed } = useAuth();
  const { userId } = useParams();

  const queryClient = useQueryClient();

  const { posts, isLoading, error } = usePosts(user.token, true, feed, userId);

  const deletePostMutation = useMutation(
    (postId) => {
      return useDeletePost(user.token, postId);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["userPosts"]);
        queryClient.refetchQueries(["/posts/profile"]);
      },
    }
  );

  const updatePostMutation = useMutation(
    (postData) => {
      return useUpdatePostVisibility(user.token, postData);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["userPosts"]);
        queryClient.refetchQueries(["/posts/profile"]);
      },
    }
  );

  const handleDeletePost = (id) => {
    deletePostMutation.mutate({ postId: id });
  };

  const handleChangeVisibility = (id, visibility) => {
    updatePostMutation.mutate({ postId: id, visibility: visibility });
  };

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

  if (error) {
    if (error.response.data.message === "User not found") {
      return (
        <Text textAlign="center" color="red.500">
          User does not exist
        </Text>
      );
    }
    return (
      <Text textAlign="center" color="red.500">
        An error occured
      </Text>
    );
  }
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
                <Box>
                  {user._id === userId && (
                    <Menu>
                      <Tooltip label="Post visibility">
                        <MenuButton
                          bg="transparent"
                          as={Button}
                          rightIcon={
                            post?.visibility === "global" ? (
                              <AiOutlineGlobal />
                            ) : post?.visibility === "friends" ? (
                              <AiOutlineUsergroupDelete />
                            ) : (
                              <RiGitRepositoryPrivateFill />
                            )
                          }
                        ></MenuButton>
                      </Tooltip>

                      <MenuList>
                        {post?.visibility !== "global" && (
                          <MenuItem
                            display="flex"
                            gap={2}
                            onClick={() =>
                              handleChangeVisibility(post?._id, "global")
                            }
                          >
                            <Text>Global visibility</Text>
                            <AiOutlineGlobal />
                          </MenuItem>
                        )}
                        {post?.visibility !== "friends" && (
                          <MenuItem
                            display="flex"
                            gap={2}
                            onClick={() =>
                              handleChangeVisibility(post?._id, "friends")
                            }
                          >
                            <Text>Only friends</Text>
                            <AiOutlineUsergroupDelete />
                          </MenuItem>
                        )}
                        {post?.visibility !== "private" && (
                          <MenuItem
                            display="flex"
                            gap={2}
                            onClick={() =>
                              handleChangeVisibility(post?._id, "private")
                            }
                          >
                            <Text>Only me</Text>
                            <RiGitRepositoryPrivateFill />
                          </MenuItem>
                        )}
                      </MenuList>
                    </Menu>
                  )}
                  {user._id === userId && (
                    <Menu>
                      <Tooltip label="Delete post">
                        <MenuButton
                          bg="transparent"
                          as={Button}
                          rightIcon={<BsThreeDots />}
                        ></MenuButton>
                      </Tooltip>
                      <MenuList>
                        <MenuItem onClick={() => handleDeletePost(post?._id)}>
                          Delete this post
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Box>
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
                  maxW="100%"
                  objectFit="contain"
                />
              )}
              <Box display="flex" justifyContent="center">
                {post.liked.status ? (
                  <Button
                    leftIcon={<AiFillLike />}
                    bg="teal.800"
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
        <Text textAlign="center" color="red.500">
          Nothing to show...
        </Text>
      )}
    </>
  );
};

export default ProfilePosts;
