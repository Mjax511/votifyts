import React from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Spinner } from "@chakra-ui/react";

type FetchData = {
  items: Array<{ name: string; id: string; tracks: any }>;
  total: number;
};

export const Playlists: React.FC = () => {
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!data) {
    //checks to make sure data exists otherwise data needs to be data?
    return <div>Playlist Loading from {endpoint}</div>;
  }

  const onClick = (options: { index: number }) => {
    const { index } = options;
    navigate(`/playlists/${data.items[index].id}`);
  };

  const listPlaylists = (list: FetchData) => {
    return list.items.map((playlist, i) => {
      return (
        <ListItem key={playlist.id} onClick={() => onClick({ index: i })}>
          {playlist.name}
        </ListItem>
      );
    });
  };
  return (
    <div>
      <List>{listPlaylists(data)}</List>
    </div>
  );
};
