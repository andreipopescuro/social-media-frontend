import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    if (login.isLoading) return;
    login.mutate(data);
  };
  const handleSetUser = () => {
    setValue("email", "Admin@gmail.com");
    setValue("password", "Admin");
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
          Log into your account
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
            _placeholder={{ color: "yellow.100" }}
            autoComplete="email"
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
            autoComplete="current-password"
          />
          {errors.password && (
            <Box color={"red.500"}>{errors.password.message}</Box>
          )}
          {login.isError && (
            <Box color={"red.500"}>{login.error.response.data}</Box>
          )}

          <Button
            maxW={"100px"}
            width={"50%"}
            color={"whiteAlpha.800"}
            bgGradient="linear(to-l, teal.400, yellow.500)"
            _hover={{
              bgGradient: "linear(to-l, red.500, yellow.500)",
            }}
            type="submit"
            isLoading={login.isLoading}
          >
            Login
          </Button>
        </form>
        <Button
          color={"whiteAlpha.800"}
          bgGradient="linear(to-l, purple.400, red.500)"
          _hover={{
            bgGradient: "linear(to-l, red.500, yellow.500)",
          }}
          onClick={handleSetUser}
        >
          Use an existing user
        </Button>
      </Flex>
    </>
  );
};

export default Login;
