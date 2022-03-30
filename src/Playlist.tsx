import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Songlist } from "./SongList";
import { Route } from "react-router-dom";

type FetchData = {
  items: Array<{ name: string; id: string; tracks: any }>;
  total: number;
};

export const PlayList: React.FC = () => {
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
    // return <Songlist playlistId={data.items[playlistId].id}></Songlist>;
    return <Route path=":playlistId" element={<Songlist playlistId="{data.items[playlistId].name}"/>}/>
  }
  const onClick = (options: { key: number }): void => {
    const { key } = options;
    setPlaylistId(key);
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
