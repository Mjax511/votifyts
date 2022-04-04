import React from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Link as RouterLink } from "react-router-dom";
import { Link, Spinner, Box } from "@chakra-ui/react";

export const Homepage = () => {
  const endpoint = "https://api.spotify.com/v1/me";
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const [loading, data] = useHandleFetchAndLoad<{
    display_name: string;
  }>({ endpoint, requestOptions });

  if (loading) {
    return (
      <Box>
        <Spinner />
        <Box>Loading from {endpoint}</Box>
      </Box>
    );
  }

  const userName = data?.display_name;
  return (
    <Box>
      <h1>Welcome {userName}</h1>
      <Link as={RouterLink} to="/playlists">
        Playlists
      </Link>
    </Box>
  );
};
