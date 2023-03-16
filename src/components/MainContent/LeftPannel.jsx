import {
  Avatar,
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserFriends } from "../../hooks/useQueryFunctions/user";

const LeftPannel = ({ children }) => {
  const { user } = useAuth();
  const { userFriends, isLoading, error } = useUserFriends(
    user.token,
    user._id
  );
  return (
    <Stack w="300px" p={3} bg="whiteAlpha.300" borderRadius={10}>
      <Flex
        flex={1}
        bg="whiteAlpha.200"
        borderRadius={5}
        direction="column"
        overflowY="auto"
      >
        <Text textAlign="center" fontSize={20}>
          Your friends
        </Text>
        {error && (
          <Text textAlign="center" color="red.500">
            An error occured
          </Text>
        )}
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
          ) : userFriends?.friends.length > 0 ? (
            userFriends.friends.map((friend) => (
              <Stack direction="row" align={"center"} p={3} key={friend._id}>
                <Link to={`/${friend._id}`}>
                  <Box
                    display="flex"
                    direction="row"
                    alignItems="center"
                    gap={2}
                  >
                    <Avatar name={friend?.name} src={friend?.pic} />
                    <Box>
                      <Text fontWeight="bold">{friend.name}</Text>
                      {friend?.occupation && <Text>@{friend.occupation}</Text>}
                    </Box>
                  </Box>
                </Link>
              </Stack>
            ))
          ) : (
            <Text textAlign="center" color="whiteAlpha.500">
              You don't have friends
            </Text>
          )}
        </Box>
      </Flex>
      {children}
    </Stack>
  );
};

export default LeftPannel;
