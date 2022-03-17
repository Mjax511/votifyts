import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

export const PlayList: React.FC = () => {
  const [itemClicke, setItemClicked] = useState(null);
  const endpoint = "https://api.spotify.com/v1/me/playlists";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  const requestoptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };

  const [loading, data] = useHandleFetchAndLoad<{items: Array<{collaborative: boolean}>, total: number}>(endpoint, requestoptions);

  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }

console.log(data?.items[0].collaborative)
  return <div>list of playlists items= {} total = {data?.total}</div>;
};
