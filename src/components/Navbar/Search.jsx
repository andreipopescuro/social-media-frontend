import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Stack,
  Icon,
  Avatar,
  InputGroup,
  Tooltip,
  Input,
  HStack,
  InputRightElement,
  useMediaQuery,
  Box,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { createAxiosInstance } from "../../lib/axiosRequest";
const Search = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [isSmallerThanSmall] = useMediaQuery("(max-width: 768px)");

  const handleSearch = async (e) => {
    if (!search) return;
    if (e.key === "Enter") {
      try {
        setShow(true);
        setLoading(true);
        const axiosInstance = createAxiosInstance(user.token);
        const { data } = await axiosInstance.get(`/user?search=${search}`);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  return (
    <Stack direction="row" alignItems="center">
      <Tooltip label="Home">
        <Link to="/">
          <Avatar
            name=""
            src={Logo}
            boxSize={isSmallerThanSmall ? "2.25em" : "3.75em"}
          />
        </Link>
      </Tooltip>
      <InputGroup position="relative">
        <Tooltip label="Search">
          <Input
            borderColor={"yellow.200"}
            focusBorderColor="teal.200"
            _placeholder={{ color: "yellow.100" }}
            placeholder="Search for someone"
            color="white"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            onBlur={() => setShow(false)}
          />
        </Tooltip>

        <InputRightElement children={<AiOutlineSearch />} color="yellow.200" />
        {show && (
          <Box
            position="absolute"
            w="inherit"
            top="100%"
            height="auto"
            display="flex"
            flexDirection="column"
            gap={1}
            bg="whiteAlpha.800"
            zIndex={999999999999}
            p={2}
            borderRadius={5}
            maxH="300px"
            overflow="auto"
          >
            {loading ? (
              <>
                <Skeleton height="30px" />
                <Skeleton height="30px" />
                <Skeleton height="30px" />
              </>
            ) : searchResult.length > 0 ? (
              searchResult.map((res) => (
                <Link
                  key={res._id}
                  to={`/${res._id}`}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Stack key={res._id} alignItems="center" direction="row">
                    <Avatar name={res?.name} src={res?.pic} />
                    <Box>
                      <Text fontWeight="bold">{res?.name}</Text>
                      {res?.isFriend && <Text fontSize={12}>Friend</Text>}
                    </Box>
                  </Stack>
                </Link>
              ))
            ) : (
              <Text>User not found</Text>
            )}
          </Box>
        )}
      </InputGroup>
    </Stack>
  );
};

export default Search;
