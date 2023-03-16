import {
  Box,
  Icon,
  Skeleton,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiOutlineEnvironment, AiOutlineGlobal } from "react-icons/ai";

import { MdWorkOutline } from "react-icons/md";
import AboutModal from "./AboutModal";
import { useUserAbout } from "../../hooks/useQueryFunctions/user";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
const About = () => {
  const { user } = useAuth();
  const { userId } = useParams();

  const { userAbout, isLoading, error } = useUserAbout(user.token, userId);

  const [isSmallerThanSmall] = useMediaQuery("(min-width: 768px)");
  if (error) {
    return (
      <Text textAlign="center" color="red.500">
        An error occured
      </Text>
    );
  }

  return (
    <Stack
      flexDirection="column"
      alignSelf={!isSmallerThanSmall && "center"}
      display="flex"
      bg="whiteAlpha.300"
      p={3}
      w={!isSmallerThanSmall && "90%"}
      borderRadius={5}
      flex={1}
    >
      {isLoading ? (
        <Stack>
          <Skeleton
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
            height="30px"
          />
          <Skeleton
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
            height="30px"
          />
          <Skeleton
            startColor="whiteAlpha.400"
            endColor="whiteAlpha.900"
            height="30px"
          />
        </Stack>
      ) : (
        <Box flex={1} display="flex" flexDirection="column" gap={3}>
          {user?._id === userId && (
            <>
              <Stack direction="row" align="center">
                <Icon as={AiOutlineEnvironment} />
                <Text>
                  From{" "}
                  <Box as="span" fontWeight="bold">
                    {userAbout?.city}
                  </Box>
                </Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={AiOutlineGlobal} />
                <Text>
                  <Box as="span" fontWeight="bold">
                    {userAbout?.country}
                  </Box>
                </Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={MdWorkOutline} />
                <Text>
                  Occupation{" "}
                  <Box as="span" fontWeight="bold">
                    {userAbout?.occupation}
                  </Box>
                </Text>
              </Stack>
            </>
          )}

          {user?._id !== userId && userAbout?.visibility === "private" && (
            <Text textAlign="center" color="red.500" fontWeight="bold">
              Private profile
            </Text>
          )}

          {user?._id !== userId &&
            userAbout?.visibility === "friends" &&
            (userAbout?.friends.some((friend) => friend._id === user._id) ? (
              <>
                <Stack direction="row" align="center">
                  <Icon as={AiOutlineEnvironment} />
                  <Text>
                    From{" "}
                    <Box as="span" fontWeight="bold">
                      {userAbout?.city}
                    </Box>
                  </Text>
                </Stack>
                <Stack direction="row" align="center">
                  <Icon as={AiOutlineGlobal} />
                  <Text>
                    <Box as="span" fontWeight="bold">
                      {userAbout?.country}
                    </Box>
                  </Text>
                </Stack>
                <Stack direction="row" align="center">
                  <Icon as={MdWorkOutline} />
                  <Text>
                    Occupation{" "}
                    <Box as="span" fontWeight="bold">
                      {userAbout?.occupation}
                    </Box>
                  </Text>
                </Stack>
              </>
            ) : (
              <Text textAlign="center" color="red.500" fontWeight="bold">
                Only friends can see
              </Text>
            ))}

          {user?._id !== userId && userAbout?.visibility === "global" && (
            <>
              <Stack direction="row" align="center">
                <Icon as={AiOutlineEnvironment} />
                <Text>
                  From{" "}
                  <Box as="span" fontWeight="bold">
                    {userAbout?.city}
                  </Box>
                </Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={AiOutlineGlobal} />
                <Text>
                  <Box as="span" fontWeight="bold">
                    {userAbout?.country}
                  </Box>
                </Text>
              </Stack>
              <Stack direction="row" align="center">
                <Icon as={MdWorkOutline} />
                <Text>
                  Occupation{" "}
                  <Box as="span" fontWeight="bold">
                    {userAbout?.occupation}
                  </Box>
                </Text>
              </Stack>
            </>
          )}
        </Box>
      )}
      {user?._id === userId && <AboutModal userAbout={userAbout} />}
    </Stack>
  );
};

export default About;
