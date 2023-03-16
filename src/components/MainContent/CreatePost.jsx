import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosImages, IoMdVideocam } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { createAxiosInstance } from "../../lib/axiosRequest";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateUserPosts } from "../../hooks/useQueryFunctions/user";
const CreatePost = () => {
  const { user, feed } = useAuth();
  const { userId } = useParams();
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [pic, setPic] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [visibility, setVisibility] = useState("global");
  const [uploadLoading, setUploadLoading] = useState(false);

  const queryClient = useQueryClient();

  const updatePostsMutation = useMutation(
    (data) => {
      return useUpdateUserPosts(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["userPosts"]);
        queryClient.refetchQueries(["/posts/profile"]);
        handleRemoveImage();
        setInputVal("");
        setUploadLoading(false);
      },
      onError: (err) => {
        setUploadLoading(false);
      },
    }
  );
  const handleRemoveImage = () => {
    fileInputRef.current.value = null;
    setImage(null);
    setPic("");
  };

  const handePostVisibility = (data) => {
    setVisibility(data);
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPic(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!pic && !inputVal) return;
    setUploadLoading(true);
    if (pic) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "social");
      data.append("cloud_name", "db6tgc0xt");
      fetch("https://api.cloudinary.com/v1_1/db6tgc0xt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          const image = data.url.toString();
          updatePostsMutation.mutate({
            image: image,
            visibility: visibility,
            title: inputVal,
          });
        })
        .catch((err) => {
          setUploadLoading(false);
        });
    } else {
      updatePostsMutation.mutate({
        title: inputVal,
        visibility: visibility,
      });
    }
  };
  if (userId && user._id !== userId) return;

  return (
    <Box
      bg="whiteAlpha.300"
      w="80%"
      p={2}
      borderRadius={5}
      gap={3}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={user?.pic} name={user?.name} />
        <Input
          borderColor={"yellow.200"}
          focusBorderColor="teal.200"
          _placeholder={{ color: "yellow.100" }}
          placeholder="What are you proud of today?"
          color="white"
          w="100%"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </Box>

      {image && (
        <Box position="relative">
          <IconButton
            position="absolute"
            top={0}
            right={0}
            aria-label="Remove image"
            colorScheme="red"
            onClick={handleRemoveImage}
          >
            <AiOutlineClose color="white" />
          </IconButton>
          <img src={image} alt="uploaded image" />
        </Box>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileInputChange}
        id="postinput"
      />
      {(image || inputVal) && (
        <RadioGroup defaultValue={visibility} onChange={handePostVisibility}>
          <Stack direction="row" justifyContent="space-evenly">
            <Radio value="global">Public</Radio>
            <Radio value="friends">Friends</Radio>
            <Radio value="private">Private</Radio>
          </Stack>
        </RadioGroup>
      )}
      {(image || inputVal) && (
        <Button
          colorScheme="teal"
          onClick={handleCreatePost}
          isLoading={uploadLoading}
        >
          Create a new post{" "}
        </Button>
      )}

      <Divider />
      <Box display="flex" gap={2}>
        <Button
          flex={1}
          display="flex"
          gap={2}
          variant="unstyled"
          onClick={handleSelectFile}
        >
          <Icon as={IoIosImages} color="teal" />
          <Text>Image</Text>
        </Button>
        <Button flex={1} display="flex" gap={2} variant="unstyled">
          <Icon as={IoMdVideocam} color="red" />
          <Text>Video</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePost;
