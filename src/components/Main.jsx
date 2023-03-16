import React from "react";
import LeftPannel from "./MainContent/LeftPannel";
import MiddlePannel from "./MainContent/MiddlePannel";
import RightPannel from "./MainContent/RightPannel";
import { Box, useMediaQuery } from "@chakra-ui/react";
import SettingsModal from "./MainContent/SettingsModal";
const Main = () => {
  const [isSmallerThanMedium] = useMediaQuery("(min-width: 1076px)");
  const [isSmallerThanSmall] = useMediaQuery("(min-width: 768px)");
  return (
    <Box
      flex={1}
      mt={0}
      display="flex"
      p={3}
      gap={3}
      h={"90%"}
      id="strange-box-with-margin"
    >
      {isSmallerThanSmall && (
        <LeftPannel>
          <SettingsModal />
        </LeftPannel>
      )}
      <MiddlePannel />
      {isSmallerThanMedium && <RightPannel />}
    </Box>
  );
};

export default Main;
