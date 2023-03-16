import { Avatar, Box, IconButton, Input, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddComment } from "../../hooks/useQueryFunctions/user";

const PostCommBox = ({ postId }) => {
  const { user } = useAuth();

  const [inputVal, setInputVal] = useState("");

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation(
    (data) => {
      return useAddComment(user.token, data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["/posts"]);
        queryClient.refetchQueries(["/posts/profile"]);
      },
    }
  );

  const handleInput = (e) => {
    if (e.key === "Enter") {
      postComment();
    }
  };

  const postComment = () => {
    if (inputVal === "") return;
    if (addCommentMutation.isLoading) return;
    addCommentMutation.mutate({
      title: inputVal,
      postId,
    });
    setInputVal("");
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar src={user?.pic} name={user?.name} />
      <Input
        borderColor={"yellow.200"}
        focusBorderColor="teal.200"
        _placeholder={{ color: "yellow.100" }}
        placeholder="Write a comment "
        color="white"
        w="100%"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleInput}
      />
      <Tooltip label="Send">
        <IconButton
          bg="transparent"
          isLoading={addCommentMutation.isLoading}
          onClick={postComment}
        >
          <AiOutlineSend />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PostCommBox;
