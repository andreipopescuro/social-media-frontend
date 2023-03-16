import { Stack, Avatar, Tooltip, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Search from "./Navbar/Search";
import Notifications from "./Navbar/Notifications";
import FriendRequests from "./Navbar/FriendRequests";
import FeedSelector from "./Navbar/FeedSelector";
import { Link } from "react-router-dom";
import SearchAndLeftPannel from "./SearchAndLeftPannel";
import { useAuth } from "../context/AuthContext";
const Nav = () => {
  const { user } = useAuth();
  const [isVerySmall] = useMediaQuery("(max-width: 456px)");
  const [isMedium] = useMediaQuery("(max-width: 768px)");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      px={2}
      alignItems="center"
      bg="whiteAlpha.300"
      h={"10%"}
    >
      {!isVerySmall && <Search />}
      {isMedium && <SearchAndLeftPannel />}
      <FeedSelector />
      <Stack direction="row" alignItems="center">
        <Notifications />
        <FriendRequests />
        <Tooltip label="Profile">
          <Link to={`/${user._id}`}>
            <Stack direction="row">
              <Avatar name={user.name} src={user.pic} />
            </Stack>
          </Link>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Nav;
