import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Songlist } from "./SongList";
import { Route, Navigate, useNavigate } from "react-router-dom";

type FetchData = {
  items: Array<{ name: string; id: string; tracks: any }>;
  total: number;
};

export const PlayList: React.FC = () => {
  const navigate = useNavigate();
  const [playlistId, setPlaylistId] = useState<null | number>(null);
  const endpoint = "https://api.spotify.com/v1/me/playlists";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  const requestoptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };

  const [loading, data] = useHandleFetchAndLoad<FetchData>({
    endpoint,
    requestOptions: requestoptions,
  });

  // const onClick(options: {key : any}) => {
  //   setPlaylistId(options.key);
  // };

  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }

  if (!data) {
    //checks to make sure data exists otherwise data needs to be data?
    return <div>Playlist Loading from {endpoint}</div>;
  }

  if (playlistId !== null) {
    return <Navigate to={`playlists/${data.items[playlistId].id}`} />;
  }
  const onClick = (options: { key: number }) => {
    const { key } = options;
    console.log(data.items[key].id);
    navigate(`playlists/${data.items[key].id}`);
  };

  const listPlaylists = (list: FetchData) => {
    return list.items.map((playlist, i) => {
      return (
        <li key={i} onClick={() => onClick({ key: i })}>
          {playlist.name}
        </li>
      );
    });
  };
  return (
    <div>
      <ul>{listPlaylists(data)}</ul>
    </div>
  );
};
