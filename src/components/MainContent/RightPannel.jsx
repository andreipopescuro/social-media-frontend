import { Box, Text, Stack, Avatar, Flex, Badge } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  useRecommendationSetting,
  useUserPosts,
} from "../../hooks/useQueryFunctions/user";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
const RightPannel = () => {
  const { user } = useAuth();
  const { userPosts, isLoading, error } = useUserPosts(user.token);
  const { friendsRecommendetion, recommendLoading, recommendError } =
    useRecommendationSetting(user.token);
  return (
    <Flex
      w="300px"
      bg="whiteAlpha.300"
      borderRadius={10}
      flexDirection="column"
      p={3}
      gap={2}
    >
      <Stack flex={1} bg="whiteAlpha.200" borderRadius={5} overflowY="scroll">
        <Text textAlign="center" fontSize={20}>
          Your posts{" "}
        </Text>
        <Box display="flex" flexDirection="column">
          {isLoading ? (
            <Stack>
              <Stack direction="row" w="90%" justifyContent="center">
                <SkeletonCircle
                  height="30px"
                  startColor="whiteAlpha.400"
                  endColor="whiteAlpha.900"
                  size={10}
                />
                <Skeleton
                  height="30px"
                  startColor="whiteAlpha.400"
                  endColor="whiteAlpha.900"
                  w="70%"
                />
              </Stack>
              <Stack direction="row" w="90%" justifyContent="center">
                <SkeletonCircle
                  height="30px"
                  startColor="whiteAlpha.400"
                  endColor="whiteAlpha.900"
                  size={10}
                />
                <Skeleton
                  height="30px"
                  startColor="whiteAlpha.400"
                  endColor="whiteAlpha.900"
                  w="70%"
                />
              </Stack>
              <Stack direction="row" w="90%" justifyContent="center">
                <SkeletonCircle
                  height="30px"
                  startColor="whiteAlpha.400"
                  endColor="whiteAlpha.900"
                  size={10}
                />
                <Skeleton
                  height="30px"
                  startColor="whiteAlpha.400"
                  endColor="whiteAlpha.900"
                  w="70%"
                />
              </Stack>
            </Stack>
          ) : userPosts?.posts.length > 0 ? (
            userPosts.posts.map((post) => (
              <Stack direction="row" align={"center"} p={3} key={post?._id}>
                <Avatar name={post?.title} src={post?.image} />
                <Box>
                  <Text color="whiteAlpha.600">
                    {new Date(post?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Badge variant="subtle" colorScheme="yellow">
                    {post?.visibility}
                  </Badge>
                </Box>
              </Stack>
            ))
          ) : (
            <Text textAlign="center" color="whiteAlpha.600">
              No posts found
            </Text>
          )}
          {error && (
            <Text textAlign="center" color="red.600">
              An error occured
            </Text>
          )}
        </Box>
      </Stack>
      <Stack flex={1} bg="whiteAlpha.200" borderRadius={5} overflowY="scroll">
        <Text textAlign="center" fontSize={20}>
          You might know
        </Text>
        {recommendLoading ? (
          <Stack>
            <Stack direction="row" w="90%" justifyContent="center">
              <SkeletonCircle
                height="30px"
                startColor="whiteAlpha.400"
                endColor="whiteAlpha.900"
                size={10}
              />
              <Skeleton
                height="30px"
                startColor="whiteAlpha.400"
                endColor="whiteAlpha.900"
                w="70%"
              />
            </Stack>
            <Stack direction="row" w="90%" justifyContent="center">
              <SkeletonCircle
                height="30px"
                startColor="whiteAlpha.400"
                endColor="whiteAlpha.900"
                size={10}
              />
              <Skeleton
                height="30px"
                startColor="whiteAlpha.400"
                endColor="whiteAlpha.900"
                w="70%"
              />
            </Stack>
            <Stack direction="row" w="90%" justifyContent="center">
              <SkeletonCircle
                height="30px"
                startColor="whiteAlpha.400"
                endColor="whiteAlpha.900"
                size={10}
              />
              <Skeleton
                height="30px"
                startColor="whiteAlpha.400"
                endColor="whiteAlpha.900"
                w="70%"
              />
            </Stack>
          </Stack>
        ) : error ? (
          <Text color="red.500" textAlign="center">
            An error occured
          </Text>
        ) : (
          friendsRecommendetion.map((fr) => (
            <Link to={`/${fr._id}`} key={fr._id}>
              <Box display="flex" flexDirection="column" key={fr._id}>
                <Stack direction="row" align={"center"} p={1}>
                  <Avatar name={fr.name} src={fr.pic} />
                  <Text fontWeight="bold">{fr.name}</Text>
                </Stack>
              </Box>
            </Link>
          ))
        )}
      </Stack>
    </Flex>
  );
};

export default RightPannel;
