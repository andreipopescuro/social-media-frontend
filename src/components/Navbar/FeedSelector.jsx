import {
  Tabs,
  TabList,
  Tab,
  Icon,
  Tooltip,
  useMediaQuery,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { AiOutlineGlobal, AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const FeedSelector = () => {
  const { userId } = useParams();
  const { feed, handleFeedOptionChange } = useAuth();
  const [isSmallerThanSmall] = useMediaQuery("(max-width: 768px)");
  const [isVerySmall] = useMediaQuery("(max-width: 500px)");
  return (
    <Tabs variant="soft-rounded">
      <TabList>
        <Tooltip label="Global">
          <Tab
            p={isVerySmall && 1}
            onClick={() => handleFeedOptionChange("global")}
            isDisabled={userId || feed === "global"}
          >
            <AiOutlineGlobal size={isSmallerThanSmall ? 16 : 24} />
          </Tab>
        </Tooltip>
        <Tooltip label="Friends only">
          <Tab
            p={isVerySmall && 1}
            onClick={() => handleFeedOptionChange("friends")}
            isDisabled={userId || feed === "friends"}
          >
            <AiOutlineUser size={isSmallerThanSmall ? 16 : 24} />
          </Tab>
        </Tooltip>
      </TabList>
    </Tabs>
  );
};

export default FeedSelector;
