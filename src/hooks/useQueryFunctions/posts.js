import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createAxiosInstance } from "../../lib/axiosRequest";

export const usePosts = (
  token,
  userProfile = false,
  preference,
  userId = null
) => {
  const endpoint = userProfile ? "/posts/profile" : "/posts";
  let query = [];
  if (userProfile) {
    query = [endpoint, userId];
  } else {
    query = [endpoint, preference];
  }
  const { data, isLoading, error } = useQuery(
    query,
    async () => {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get(endpoint, {
        params: { visibility: preference, userId: userId },
      });
      return response.data;
    },
    {
      retry: false,
    }
  );
  return { posts: data, isLoading, error };
};

export const useDeletePost = async (token, postId) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.delete("/posts", {
    params: postId,
  });
  return response.data;
};

export const useUpdatePostVisibility = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.put("/posts", data);
  return response.data;
};
