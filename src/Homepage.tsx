import React, { useEffect } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { Link, Spinner, Box, Button } from "@chakra-ui/react";
import { useAuth } from "./AuthContext";

export const Homepage = () => {
  const auth = useAuth();
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

  useEffect(() => {
    if (data) auth?.setUser(data.display_name);
  }, [data, auth]);

  useEffect(() => {}, [auth?.user]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="baseline">
        <h1>Welcome {data?.display_name}</h1>
        {auth?.user ? (
          <Button onClick={auth?.signOut}>SignOut</Button>
        ) : (
          <Button onClick={auth?.signIn}>SignIn</Button>
        )}
      </Box>
      <Outlet />
      {
        // <Link as={RouterLink} to="/playlists">
        //Playlists
        //</Link>
      }
    </Box>
  );
};
