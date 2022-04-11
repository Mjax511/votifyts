import React, { useState } from 'react';
import { useHandleFetchAndLoad } from './useHandleFetchAndLoad';
import { useParams } from 'react-router-dom';
import { List, ListItem, Spinner, Box } from '@chakra-ui/react';

type FetchData = {
  items: Array<{ track: { name: string } }>;
  offset: number;
  next: string;
  total: number;
  error: null | { error: any };
};

export const Playlist: React.FC = () => {
  const playlistId = useParams().playlistId;
  const [songList, setSongList] = useState({ index: 0, tracks: [] });
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${songList.index}`;
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${sessionStorage.accessToken}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const [loading, data, error] = useHandleFetchAndLoad<FetchData>({
    endpoint,
    requestOptions,
  });

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (!data) {
    return <Box>no data in songlist</Box>;
  }

  if (data.error) {
    return <Box>404</Box>;
  }
  const listSongs = (list: FetchData) => {
    return list.items.map((song, i) => (
      <ListItem key={i}>{song.track.name}</ListItem>
    ));
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
    <Box>
      <List>{listSongs(data)}</List>
    </Box>
  );
};
