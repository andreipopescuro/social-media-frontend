import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  AvatarGroup,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import SettingsModal from "../MainContent/SettingsModal";
import { AiFillCamera } from "react-icons/ai";
import UploadPicModal from "./UploadPicModal";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import {
  useAddFriendRequest,
  useRemoveFriendRequest,
  useUserInfo,
  useRemoveFromFriends,
} from "../../hooks/useQueryFunctions/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
const ProfileInfo = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const { userInfo, isLoading, error } = useUserInfo(user.token, userId);

  const [isSmallerThanMedium] = useMediaQuery("(max-width: 768px)");

  const { data: myRequests } = useQuery(["friendRequests"]);

  const sendRequestMutation = useMutation(
    (data) => {
      return useAddFriendRequest(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["userInfo", userId]);
      },
    }
  );

  const removeRequestMutation = useMutation(
    (data) => {
      return useRemoveFriendRequest(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["userInfo", userId]);
      },
    }
  );

  const removeFromFriendsMutation = useMutation(
    (data) => {
      return useRemoveFromFriends(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["userInfo", userId]);
        queryClient.refetchQueries(["userFriends"]);
        queryClient.refetchQueries(["userAbout"]);
      },
    }
  );

  const handleSendFriendRequest = () => {
    if (sendRequestMutation.isLoading) return;
    sendRequestMutation.mutate({
      userId: userId,
    });
  };

  const handleRemoveFriendRequest = () => {
    if (removeRequestMutation.isLoading) return;
    removeRequestMutation.mutate({
      userId: userId,
    });
  };

  const handleRemoveFromFriends = () => {
    if (removeFromFriendsMutation.isLoading) return;
    removeFromFriendsMutation.mutate({
      theOtherUser: userId,
    });
  };

  if (error) {
    return (
      <Text textAlign="center" color="red.500">
        An error occured
      </Text>
    );
  }

  return (
    <Box
      bg="whiteAlpha.300"
      flexDirection={isSmallerThanMedium ? "row" : "column"}
      display="flex"
      borderRadius={10}
      p={isSmallerThanMedium ? 1 : 4}
      flex={1}
    >
      {isLoading ? (
        <Stack>
          <Skeleton
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
            height="30px"
          />
          <Skeleton
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
            height="30px"
          />
          <Skeleton
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
            height="30px"
          />
        </Stack>
      ) : (
        <>
          <Stack justifyContent="center" alignItems="center">
            <Avatar
              name={userInfo?.name}
              src={userInfo?.pic}
              boxSize={isSmallerThanMedium ? 24 : 32}
            >
              {user?._id === userId && <UploadPicModal />}
            </Avatar>
          </Stack>
          <Box textAlign="center" py={isSmallerThanMedium && 5}>
            <Text fontSize={28}>{userInfo?.name}</Text>
            {user?._id === userId && (
              <>
                <Text>{userInfo?.friends.length} friends</Text>
                <Stack flexDirection="row" justifyContent="center">
                  <AvatarGroup size="md" max={3}>
                    {userInfo?.friends.map((fr) => (
                      <Avatar name={fr.name} src={fr.pic} key={fr._id} />
                    ))}
                  </AvatarGroup>
                </Stack>
                <Text>
                  {userInfo?.posts.length}{" "}
                  {userInfo?.posts.length > 1 ? "posts" : "post"}
                </Text>
              </>
            )}
            {user?._id !== userId && userInfo?.visibility === "private" && (
              <Text textAlign="center" color="red.500" fontWeight="bold">
                Private profile
              </Text>
            )}
            {user?._id !== userId &&
              userInfo?.visibility === "friends" &&
              (userInfo?.friends.some((friend) => friend._id === user._id) ? (
                <>
                  <Text>{userInfo?.friends.length} friends</Text>
                  <Stack flexDirection="row" justifyContent="center">
                    <AvatarGroup size="md" max={3}>
                      {userInfo?.friends.map((fr) => (
                        <Avatar name={fr.name} src={fr.pic} key={fr._id} />
                      ))}
                    </AvatarGroup>
                  </Stack>
                  <Text>
                    {userInfo?.posts.length}{" "}
                    {userInfo?.posts.length > 1 ? "posts" : "post"}
                  </Text>
                </>
              ) : (
                <Text textAlign="center" color="red.500" fontWeight="bold">
                  Only friends can see
                </Text>
              ))}
            {user?._id !== userId && userInfo?.visibility === "global" && (
              <>
                <Text>{userInfo?.friends.length} friends</Text>
                <Stack flexDirection="row" justifyContent="center">
                  <AvatarGroup size="md" max={3}>
                    {userInfo?.friends.map((fr) => (
                      <Avatar name={fr.name} src={fr.pic} key={fr._id} />
                    ))}
                  </AvatarGroup>
                </Stack>
                <Text>
                  {userInfo?.posts.length}{" "}
                  {userInfo?.posts.length > 1 ? "posts" : "post"}
                </Text>
              </>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex={1}
            justifyContent="space-between"
            p={2}
            py={5}
            gap={3}
          >
            {user?.id !== userId &&
              myRequests?.friendRequests.some(
                (req) => req.sender._id === userId
              ) && (
                <Text textAlign="center" fontWeight="bold">
                  This user sent you a friend request
                </Text>
              )}
            {user?._id !== userId &&
              userInfo?.friends.every((friend) => friend._id !== user._id) &&
              myRequests?.friendRequests.every(
                (req) => req.sender._id !== userId
              ) && (
                <Button
                  colorScheme="teal"
                  isDisabled={userInfo?.friendRequests.some(
                    (req) => req.sender === user._id
                  )}
                  onClick={handleSendFriendRequest}
                  isLoading={sendRequestMutation.isLoading}
                >
                  {userInfo?.friendRequests.some(
                    (req) => req.sender === user._id
                  )
                    ? "Request sent"
                    : "Send request"}
                </Button>
              )}
            {}
            {userInfo?.friends.some((friend) => friend._id === user?._id) && (
              <>
                <Text textAlign="center" fontWeight="bold">
                  Friends
                </Text>
                <Button
                  colorScheme="teal"
                  onClick={handleRemoveFromFriends}
                  isLoading={removeFromFriendsMutation.isLoading}
                >
                  Remove from friends
                </Button>
              </>
            )}

            {user?._id !== userId &&
            userInfo?.friendRequests.some((req) => req.sender === user._id) ? (
              <Button
                colorScheme="yellow"
                onClick={handleRemoveFriendRequest}
                isLoading={removeRequestMutation.isLoading}
              >
                Remove request
              </Button>
            ) : (
              ""
            )}

            {user?._id === userId && <SettingsModal />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProfileInfo;
