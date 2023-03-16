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
  Stack,
  Text,
  Icon,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { AiOutlineInfo } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateUserAbout } from "../../hooks/useQueryFunctions/user";
import { useState, useEffect } from "react";
const AboutModal = ({ userAbout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updateAboutMutation = useMutation(
    (data) => {
      return useUpdateUserAbout(user.token, data);
    },
    {
      onSuccess: (newData) => {
        queryClient.invalidateQueries(["userAbout", newData._id]);
        queryClient.setQueryData(["userAbout", newData._id], newData);
        onClose();
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (userAbout) {
      setValue("city", userAbout.city);
      setValue("country", userAbout.country);
      setValue("occupation", userAbout.occupation);
    }
  }, [userAbout]);

  const onSubmit = (data) => {
    updateAboutMutation.mutate(data);
  };

  return (
    <Stack>
      <Button
        onClick={onOpen}
        bgGradient="linear(to-l, teal.400, yellow.500)"
        _hover={{
          bgGradient: "linear(to-l, red.500, yellow.500)",
        }}
        color="whiteAlpha.900"
      >
        Edit details
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgGradient={["linear(to-tr, teal.400, yellow.500)"]}>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                color: "white",
              }}
            >
              <Input
                {...register("city", {
                  maxLength: {
                    value: 20,
                    message: "City name is too long",
                  },
                  minLength: {
                    value: 2,
                    message: "Minimum 5 characters for city",
                  },
                })}
                borderColor={"yellow.200"}
                focusBorderColor="teal.200"
                type="text"
                _placeholder={{ color: "yellow.100" }}
                placeholder="City"
                autoComplete="city"
              />
              {errors.city && (
                <Box color={"red.500"}>{errors.city.message}</Box>
              )}

              <Input
                {...register("country", {
                  maxLength: {
                    value: 20,
                    message: "Country name is too long",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters for country",
                  },
                })}
                borderColor={"yellow.200"}
                focusBorderColor="teal.200"
                placeholder="Country"
                type="text"
                _placeholder={{ color: "yellow.100" }}
                autoComplete="contry"
              />
              {errors.country && (
                <Box color={"red.500"}>{errors.country.message}</Box>
              )}
              <Input
                {...register("occupation", {
                  maxLength: {
                    value: 20,
                    message: "Occupation field is too long",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters for occupation",
                  },
                })}
                borderColor={"yellow.200"}
                focusBorderColor="teal.200"
                placeholder="Occupation"
                type="text"
                _placeholder={{ color: "yellow.100" }}
                autoComplete="occupation"
              />
              {errors.occupation && (
                <Box color={"red.500"}>{errors.occupation.message}</Box>
              )}
              <Stack flexDirection="row" alignItems="center" gap={2}>
                <Icon
                  as={AiOutlineInfo}
                  color="white"
                  bg="blue"
                  borderRadius="50%"
                />
                <Text>If you want to delete a field let it empty.</Text>
              </Stack>
              {/* {login.isError && (
                <Box color={"red.500"}>{login.error.response.data}</Box>
              )} */}
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={updateAboutMutation.isLoading}
              >
                Save changes
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button colorScheme="yellow" mr={3} onClick={onClose}>
                Close
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default AboutModal;
