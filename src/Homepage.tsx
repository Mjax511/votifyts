import React, { useEffect } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { Link, Spinner } from "@chakra-ui/react";
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

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {data?.display_name}</h1>
      <Outlet />
      {
        // <Link as={RouterLink} to="/playlists">
        //Playlists
        //</Link>
      }
    </div>
  );
};
