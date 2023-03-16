import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Box,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Icon,
  Skeleton,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineInfo } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  useUserSetting,
  useUpdateUserSettings,
} from "../../hooks/useQueryFunctions/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const SettingsModal = () => {
  const { logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userSettings, isLoading, error } = useUserSetting(user.token);

  const [postsSettings, setPostSettings] = useState(null);
  const [profileSettings, setPofileSettings] = useState(null);

  useEffect(() => {
    if (userSettings) {
      setPostSettings(userSettings.postsVisibility);
      setPofileSettings(userSettings.visibility);
    }
  }, [userSettings]);

  const queryClient = useQueryClient();

  const updateSettingsMutation = useMutation(
    (data) => {
      return useUpdateUserSettings(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userPosts");
        queryClient.invalidateQueries("/posts/profile");
        onClose();
      },
      refetchQueries: ["userPosts", "/posts/profile"],
    }
  );

  const handleSettingsChanges = () => {
    updateSettingsMutation.mutate({
      visibility: profileSettings,
      postsVisibility: postsSettings,
    });
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  if (error) {
    return (
      <Text textAlign="center" color="red.500">
        An error occured
      </Text>
    );
  }

  return (
    <Stack>
      <Button
        onClick={onOpen}
        bgGradient="linear(to-l, teal.400, yellow.500)"
        _hover={{
          bgGradient: "linear(to-l, red.500, yellow.500)",
        }}
        color="whiteAlpha.9 00"
      >
        Settings
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Stack>
                <Skeleton height="100px" />
              </Stack>
            ) : (
              <>
                <Stack>
                  <Text>Who can see my profile?</Text>
                  <RadioGroup
                    defaultValue={profileSettings}
                    onChange={(data) => setPofileSettings(data)}
                  >
                    <Stack spacing={4} direction="row">
                      <Radio value="global">Public</Radio>
                      <Radio value="friends">Friends</Radio>
                      <Radio value="private">Private</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Stack>
                  <Text>Who can see my posts?</Text>
                  <RadioGroup
                    defaultValue={postsSettings}
                    onChange={(data) => setPostSettings(data)}
                  >
                    <Stack spacing={4} direction="row">
                      <Radio value="global">Public</Radio>
                      <Radio value="friends">Friends</Radio>
                      <Radio value="private">Private</Radio>
                      <Radio value="custom">Custom</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Divider orientation="horizontal" />
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Icon
                    as={AiOutlineInfo}
                    color="white"
                    bg="blue"
                    borderRadius="50%"
                  />
                  <Text>
                    When changing posts visibility, every post will take that
                    option.
                  </Text>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Icon
                    as={AiOutlineInfo}
                    color="white"
                    bg="blue"
                    borderRadius="50%"
                  />
                  <Text>Profile settings does not affect posts settings.</Text>
                </Stack>
              </>
            )}
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme="red" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Box>
              <Button colorScheme="yellow" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="teal"
                onClick={handleSettingsChanges}
                isLoading={updateSettingsMutation.isLoading}
              >
                Save changes
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default SettingsModal;
