import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Songlist } from "./SongList";

export const PlayList: React.FC = () => {
  const [itemClicked, setItemClicked] = useState<number>(-1);
  const endpoint = "https://api.spotify.com/v1/me/playlists";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  const requestoptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };

  type fetchData = {
    items: Array<{ name: string; id: string; tracks: any }>;
    total: number;
  };
  const [loading, data] = useHandleFetchAndLoad<fetchData>({
    endpoint,
    requestOptions: requestoptions,
  });

  // const onClick(options: {key : any}) => {
  //   setItemClicked(options.key);
  // };

  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }

  if (!data) {
    //checks to make sure data exists otherwise data needs to be data?
    return <div>Playlist Loading from {endpoint}</div>;
  }

  if (itemClicked !== -1) {
    return <Songlist playlistId={data.items[itemClicked].id}></Songlist>;
  }
  const onClick = (options: { key: number }): void => {
    const { key } = options;
    setItemClicked(key);
  };

  const listPlaylists = (list: fetchData) => {
    return list.items.map((e, i) => {
      return (
        <li key={i} onClick={() => onClick({ key: i })}>
          {e.name}
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
