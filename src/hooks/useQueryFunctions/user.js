import { useQuery } from "@tanstack/react-query";
import { createAxiosInstance } from "../../lib/axiosRequest";

export const useUser = (token, userId) => {
  const { data, isLoading, error } = useQuery(["user"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user", {
      params: { userId },
    });
    return response.data;
  });
  return { userData: data, isLoading, error };
};

export const useUserPosts = (token) => {
  const { data, isLoading, error } = useQuery(["userPosts"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user/posts");
    return response.data;
  });
  return { userPosts: data, isLoading, error };
};

export const useUserFriends = (token, userId) => {
  const { data, isLoading, error } = useQuery(["userFriends"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user/friends");
    return response.data;
  });
  return { userFriends: data, isLoading, error };
};

export const useUserInfo = (token, userId) => {
  const { data, isLoading, error } = useQuery(
    ["userInfo", userId],
    async () => {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get("/user/info", {
        params: { userId },
      });
      return response.data;
    }
  );
  return { userInfo: data, isLoading, error };
};

export const useUserAbout = (token, userId) => {
  const { data, isLoading, error } = useQuery(
    ["userAbout", userId],
    async () => {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get("/user/about", {
        params: { userId },
      });
      return response.data;
    }
  );
  return { userAbout: data, isLoading, error };
};

export const useUpdateUserAbout = async (token, newData) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.put("/user/about", newData);
  return response.data;
};

export const useUpdateUserPosts = async (token, newData) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.post("/posts", newData);
  return response.data;
};

export const useUserSetting = (token) => {
  const { data, isLoading, error } = useQuery(["settings"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user/settings");
    return response.data;
  });
  return { userSettings: data, isLoading, error };
};

export const useUpdateUserSettings = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.put("/user/settings", data);
  return response.data;
};

export const useAddFriendRequest = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.post("/user/friendRequest", data);
  return response.data;
};

export const useRemoveFriendRequest = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.delete("/user/friendRequest", {
    params: data,
  });
  return response.data;
};

export const useUserFriendRequests = (token) => {
  const { data, isLoading, error } = useQuery(["friendRequests"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user/friendRequests");
    return response.data;
  });
  return { userData: data, isLoading, error };
};

export const useUpdateFriendRequestViewd = async (token) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.put("/user/friendRequests");
  return response.data;
};

export const useAcceptReq = async (token, senderId) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.post("/user/acceptRequest", senderId);
  return response.data;
};

export const useRejReq = async (token, senderId) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.post("/user/rejectRequest", senderId);
  return response.data;
};

export const useRemoveFromFriends = async (token, senderId) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.delete("/user/friend", {
    params: senderId,
  });
  return response.data;
};

export const useUserNotifications = (token) => {
  const { data, isLoading, error } = useQuery(["notifications"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user/notifications");
    return response.data;
  });
  return { notificationsData: data, isLoading, error };
};

export const useUpdateNotificationsViewed = async (token) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.put("/user/notifications");
  return response.data;
};

export const useRecommendationSetting = (token) => {
  const { data, isLoading, error } = useQuery(["recommended"], async () => {
    const axiosInstance = createAxiosInstance(token);
    const response = await axiosInstance.get("/user/recommended");
    return response.data;
  });
  return {
    friendsRecommendetion: data,
    recommendLoading: isLoading,
    recommendError: error,
  };
};

export const useAddComment = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.post("/posts/comment", data);
  return response.data;
};

export const useAddLike = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.post("/posts/like", data);
  return response.data;
};

export const useRemoveLike = async (token, data) => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.delete("/posts/like", {
    params: data,
  });
  return response.data;
};
