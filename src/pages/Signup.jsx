import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
const Signup = () => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const passWatch = watch("password");
  const onSubmit = (data) => {
    if (signup.isLoading) return;
    signup.mutate(data);
  };
  return (
    <>
      <Box
        fontSize={34}
        mt={20}
        textAlign={"left"}
        w={"100%"}
        mb={3}
        color={"blackAlpha.800"}
      >
        Social Media App
      </Box>
      <Flex
        w={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        bg={"whiteAlpha.100"}
        borderRadius={10}
      >
        <Box fontSize={20} color={"whiteAlpha.800"}>
          Create account
        </Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            margin: "30px 0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            gap: "10px",
            color: "white",
          }}
        >
          <Input
            {...register("name", {
              required: "Name field is required",
              maxLength: {
                value: 50,
                message: "Name is too long",
              },
              minLength: {
                value: 5,
                message: "Minimum 5 characters for name",
              },
            })}
            borderColor={"yellow.200"}
            focusBorderColor="teal.200"
            placeholder="Profile name"
            _placeholder={{ color: "yellow.100" }}
            type="text"
            autoCapitalize="words"
          />
          {errors.name && <Box color={"red.500"}>{errors.name.message}</Box>}

          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            borderColor={"yellow.200"}
            focusBorderColor="teal.200"
            placeholder="Email adress"
            type="email"
            _placeholder={{ color: "yellow.100" }}
          />
          {errors.email && <Box color={"red.500"}>{errors.email.message}</Box>}

          <Input
            {...register("password", {
              required: "Password field is required",
              maxLength: {
                value: 50,
                message: "Password is too long",
              },
              minLength: {
                value: 5,
                message: "Minimum 5 characters for password",
              },
            })}
            borderColor={"yellow.200"}
            focusBorderColor="teal.200"
            placeholder="Password"
            type="password"
            _placeholder={{ color: "yellow.100" }}
            autoComplete="off"
            bg={"transparent"}
          />
          {errors.password && (
            <Box color={"red.500"}>{errors.password.message}</Box>
          )}
          <Input
            {...register("confirmPassword", {
              required: "Password field is required",
              validate: (value) =>
                value === passWatch || "The passwords do not match",
            })}
            borderColor={"yellow.200"}
            focusBorderColor="teal.200"
            placeholder="Confirm password"
            type="password"
            _placeholder={{ color: "yellow.100" }}
            autoComplete="off"
          />
          {errors.confirmPassword && (
            <Box color={"red.500"}>{errors.confirmPassword.message}</Box>
          )}
          {signup.isError && (
            <Box color={"red.500"}>{signup.error.response.data}</Box>
          )}
          <Button
            color={"whiteAlpha.800"}
            bgGradient="linear(to-l, teal.400, yellow.500)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
            type="submit"
            isLoading={signup.isLoading}
          >
            Create account
          </Button>
        </form>
      </Flex>
    </>
  );
};

export default Signup;
