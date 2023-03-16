import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { forwardRef, useRef, useState } from "react";
import { AiFillCamera, AiOutlineClose } from "react-icons/ai";
import { createAxiosInstance } from "../../lib/axiosRequest";
import { useAuth } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const UploadPicModal = () => {
  const { user, handleChangingProfilePic } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [pic, setPic] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRemoveImage = () => {
    setImage(null);
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

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file.type.startsWith("image/")) {
      setPic(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadImage = () => {
    if (pic) {
      setUploadLoading(true);

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

          const axiosInstance = createAxiosInstance(user.token);
          try {
            const { data } = await axiosInstance.put("/user/changeProfilePic", {
              image,
            });
            setUploadLoading(false);
            setImage(null);
            queryClient.invalidateQueries("userPosts");
            queryClient.invalidateQueries(["/posts/profile"]);
            onClose();
            handleChangingProfilePic({ ...data, token: user.token });
          } catch (error) {
            setUploadLoading(false);
          }
        })
        .catch((err) => {
          setUploadLoading(false);
        });
    }
    return;
  };

  return (
    <>
      <IconButton
        position="absolute"
        bottom={0}
        right={0}
        color="teal"
        bg="whiteAlpha.700"
        cursor="pointer"
        borderRadius="50%"
        onClick={onOpen}
      >
        <AiFillCamera fontSize={24} />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload profile picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              p={4}
              border="dashed"
              borderWidth="2px"
              borderColor="gray.200"
              borderRadius="md"
              textAlign="center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {image ? (
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
              ) : (
                <Box>
                  <Box as="span" fontWeight="bold">
                    Drag and drop an image here
                  </Box>
                  <Box as="span"> or </Box>
                  <Box
                    as="u"
                    color="teal.500"
                    cursor="pointer"
                    onClick={handleSelectFile}
                  >
                    select a file
                  </Box>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileInputChange}
                  />
                </Box>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleUploadImage}
              isLoading={uploadLoading}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadPicModal;
