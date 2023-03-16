import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Text,
  Box,
  Button,
  Flex,
  Input,
  Avatar,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useUpdateNotificationsViewed,
  useUserNotifications,
} from "../../hooks/useQueryFunctions/user";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isSmallerThanSmall] = useMediaQuery("(max-width: 768px)");

  const { notificationsData, isLoading, error } = useUserNotifications(
    user.token
  );

  const updateNotificationsNumberMutation = useMutation(
    () => {
      return useUpdateNotificationsViewed(user.token);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["notifications"]);
      },
    }
  );

  const handleSetViewdNotifications = () => {
    if (notificationsData?.newNotificationsCount > 0) {
      updateNotificationsNumberMutation.mutate();
    }
  };
  return (
    <Menu>
      <Tooltip label="Notifications">
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{ bg: "transparent", color: "whiteAlpha.500" }}
          p={isSmallerThanSmall && 1}
          onClick={handleSetViewdNotifications}
          position="relative"
        >
          <BellIcon boxSize={isSmallerThanSmall ? 5 : 8} />
          {notificationsData?.newNotificationsCount > 0 && (
            <Box
              bg="red.500"
              borderRadius="50%"
              position="absolute"
              top="-30%"
              left="20%"
              p={0.5}
            >
              {notificationsData?.newNotificationsCount}
            </Box>
          )}
        </MenuButton>
      </Tooltip>
      <MenuList maxH="300px" overflow="auto">
        <MenuGroup title="Notifications">
          {notificationsData?.notifications?.length > 0 ? (
            notificationsData?.notifications.map((notif) => (
              <Box key={notif._id}>
                <MenuDivider m={0} />
                <MenuItem
                  bg={notif.type === "reject" ? "yellow.400" : "teal.400"}
                >
                  <Link to={`/${notif.sender._id}`}>
                    <Box display="flex" gap={2}>
                      <Avatar src={notif.sender.pic} name={notif.sender.name} />
                      <Box>
                        <Text fontWeight="bold">{notif.sender.name}</Text>
                        <Text>{notif.title} </Text>
                        {new Date(notif?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </Box>
                    </Box>
                  </Link>
                </MenuItem>
              </Box>
            ))
          ) : (
            <Text>You have no notifications</Text>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default Notifications;
