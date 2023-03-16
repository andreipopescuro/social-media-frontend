import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Stack,
  MenuDivider,
  Box,
  Button,
  Flex,
  Input,
  Avatar,
  Text,
  Icon,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { MdSupervisorAccount } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import {
  useUserFriendRequests,
  useUpdateFriendRequestViewd,
  useAcceptReq,
  useRejReq,
} from "../../hooks/useQueryFunctions/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const FriendRequests = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const updateFriendReqNumberMutation = useMutation(
    () => {
      return useUpdateFriendRequestViewd(user.token);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["friendRequests"]);
      },
    }
  );
  const acceptReqMutation = useMutation(
    (senderId) => {
      return useAcceptReq(user.token, senderId);
    },
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(["friendRequests"]);
        queryClient.refetchQueries(["userFriends"]);
        queryClient.refetchQueries(["userInfo"]);
        queryClient.refetchQueries(["userAbout"]);
      },
    }
  );

  const rejectReqMutation = useMutation(
    (senderId) => {
      return useRejReq(user.token, senderId);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["friendRequests"]);
        queryClient.refetchQueries(["userInfo"]);
        queryClient.refetchQueries(["userAbout"]);
      },
    }
  );

  const [isSmallerThanSmall] = useMediaQuery("(max-width: 768px)");

  const { userData, isLoading, error } = useUserFriendRequests(user.token);

  const handleAcceptFriendReq = (id) => {
    acceptReqMutation.mutate({ senderId: id });
  };
  const handleRejectFriendReq = (id) => {
    rejectReqMutation.mutate({ senderId: id });
  };
  const handleSetViewdNotifications = () => {
    if (userData?.newFriendRequestsCount > 0) {
      updateFriendReqNumberMutation.mutate();
    }
  };
  return (
    <Menu>
      <Tooltip label="Friend requests">
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{ bg: "transparent", color: "whiteAlpha.500" }}
          p={isSmallerThanSmall && 1}
          onClick={handleSetViewdNotifications}
          position="relative"
        >
          <Icon as={MdSupervisorAccount} boxSize={isSmallerThanSmall ? 5 : 8} />
          {userData?.newFriendRequestsCount > 0 && (
            <Box
              bg="red.500"
              borderRadius="50%"
              position="absolute"
              top="-30%"
              left="20%"
              p={0.5}
            >
              {userData?.newFriendRequestsCount}
            </Box>
          )}
        </MenuButton>
      </Tooltip>
      <MenuList maxH="300px" overflow="auto">
        <MenuGroup title="Friend requests">
          {userData?.friendRequests?.length > 0 ? (
            userData?.friendRequests?.map((fr) => (
              <Box key={fr._id}>
                <MenuDivider />
                <MenuItem _focus={{ bg: "transparent" }} display="fex">
                  <Link to={`/${fr.sender._id}`}>
                    <Box display="flex" gap={2}>
                      <Avatar src={fr.sender.pic} name={fr.sender.name} />
                      <Box>
                        <Text>You got a friend request from</Text>
                        <Text fontWeight="bold">{fr.sender.name}</Text>
                        {new Date(fr?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </Box>
                    </Box>
                  </Link>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={5}
                  >
                    <Button
                      colorScheme="yellow"
                      onClick={() => handleRejectFriendReq(fr.sender._id)}
                      color="white"
                      isDisabled={acceptReqMutation.isLoading}
                      isLoading={rejectReqMutation.isLoading}
                    >
                      Reject
                    </Button>
                    <Button
                      colorScheme="teal"
                      onClick={() => handleAcceptFriendReq(fr.sender._id)}
                      color="white"
                      isDisabled={rejectReqMutation.isLoading}
                      isLoading={acceptReqMutation.isLoading}
                    >
                      Accept
                    </Button>
                  </Box>
                </MenuItem>
              </Box>
            ))
          ) : (
            <Text>You don't have any friend request</Text>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default FriendRequests;
