import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

export const Songlist = (props: { playlistId: string }): React.ReactElement => {
  const [songList, setSongList] = useState({ index: 0, tracks: [] });
  const endpoint = `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks?offset=${songList.index}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  type fetchData = {
    items: Array<{ track: {name: string} }>;
    offset: number;
    next: string;
    total: number;
  };
  const [loading, data, error] = useHandleFetchAndLoad<fetchData>({
    endpoint,
    requestOptions,
  });
  console.log(data);
  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }
  if (!data){
    return <div>no data in songlist</div>
  }
  const listSongs = (list: fetchData["items"]) => {
    return list.map(( song,i ) => <li>{song.track.name}</li>)
  }
  // const listPlay = (list) => {
  //   return list.map((song, i) => (
  //     <List.Item key={i}>{song.track.name}</List.Item>
  //   ));
  // };
  // let [loading, data, error, refresh] = useHandleFetchAndLoad(
  //   endpoint,
  //   requestOptions
  // );
  // }

  // const playlistLength = data.total;

  // console.log(data.items, data.next);
  // if (songList.tracks.length < data.total) {
  //   setSongList((s) => ({
  //     tracks: [...s.tracks, ...data.items],
  //     index: s.index + 100,
  //   }));
  //   if (data.next) refresh();

  return <ul>{listSongs(data.items)}</ul>;
};
