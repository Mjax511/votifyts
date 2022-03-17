import React from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import {PlayList} from "./Playlist";

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
  }>(endpoint, requestOptions);

  if (loading) {
    return <div>Loading from {endpoint}</div>;
  }

  const userName = data?.display_name;
  return (
    <div>
      <h1>Welcome {userName}</h1>
      <PlayList />
    </div>
  );
};
