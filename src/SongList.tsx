import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { useParams } from "react-router-dom";

type FetchData = {
  items: Array<{ track: { name: string } }>;
  offset: number;
  next: string;
  total: number;
  error: null | {error: any}
};

export const Songlist: React.FC = () => {
  const playlistId = useParams().playlistId;
  const [songList, setSongList] = useState({ index: 0, tracks: [] });
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${songList.index}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const [loading, data, error] = useHandleFetchAndLoad<FetchData>({
    endpoint,
    requestOptions,
  });
  console.log(loading, data, error);
  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }
  if (!data) {
    return <div>no data in songlist</div>;
  }
  if (data.error) {
    return <div>404</div>;
  }
  const listSongs = (list: FetchData) => {
    return list.items.map((song, i) => <li key={i}>{song.track.name}</li>);
  };

  // const playlistLength = data.total;

  // console.log(data.items, data.next);
  // if (songList.tracks.length < data.total) {
  //   setSongList((s) => ({
  //     tracks: [...s.tracks, ...data.items],
  //     index: s.index + 100,
  //   }));
  //   if (data.next) refresh();

  return (
    <div>
      <ul>{listSongs(data)}</ul>
    </div>
  );
};
