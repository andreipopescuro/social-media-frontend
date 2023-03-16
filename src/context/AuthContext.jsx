import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
const Context = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user");
  const [feed, setFeed] = useState("global");

  const handleFeedOptionChange = (option) => {
    setFeed(option);
  };

  const handleChangingProfilePic = (data) => {
    setUser(data);
  };

  // console.log(user, "user in authprovider");

  const login = useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        userData
      );
      return data;
    },
    onSuccess(data) {
      setUser(data);
    },
  });

  const signup = useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        userData
      );
      return data;
    },
    onSuccess(data) {
      setUser(data);
    },
  });

  const logout = () => {
    setUser(undefined);
  };

  return (
    <Context.Provider
      value={{
        user,
        signup,
        login,
        logout,
        handleFeedOptionChange,
        handleChangingProfilePic,
        feed,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAuth() {
  return useContext(Context);
}
