import React, { useState } from 'react';
import { useHandleFetchAndLoad } from './useHandleFetchAndLoad';
import { useParams } from 'react-router-dom';
import {
  Spacer,
  List,
  ListItem,
  Spinner,
  Box,
  Text,
  Image,
} from '@chakra-ui/react';

type FetchData = {
  items: Array<{
    track: {
      name: string;
      album: { images: Array<{ url: string }> };
      artists: Array<{ name: string }>;
    };
    added_by: { id: string };
  }>;
  offset: number;
  next: string;
  total: number;
  error: null | { error: any };
};

export const Playlist: React.FC = () => {
  const playlistId = useParams().playlistId;
  const [hoverItem, setHoverItem] = useState<null | number>(null);
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
  const handleHover = (options: { key: number | null }) => {
    const { key } = options;
    if (key || key === 0) setHoverItem(key);
    if (key === null) setHoverItem(null);
  };
  console.log(data);
  const listSongs = (list: FetchData) => {
    return list.items.map((song, i) => (
      <ListItem
        display="flex"
        alignItems="center"
        onMouseEnter={() => handleHover({ key: i })}
        onMouseLeave={() => handleHover({ key: null })}
        borderBottom="1px"
        borderBottomColor="gainsboro"
        bg={hoverItem === i ? 'gainsboro' : ''}
        p="1"
        key={i}
      >
        <Image
          m="1"
          fit="contain"
          boxSize="40px"
          src={song.track.album.images[2].url}
        />
        <Text pl="5" fontSize="lg">
          {`${song.track.name}`}&nbsp;
        </Text>
        <Text color="gray.400" fontSize="md">{`- ${song.track.artists
          .map((artist) => ' ' + artist.name)
          .join(' / ')}`}</Text>
        <Spacer />
        <Text pr="5" color="gray.400" fontSize="sm">
          {`${song.added_by.id}`}
        </Text>
      </ListItem>
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
      <List pt="5">{listSongs(data)}</List>
    </Box>
  );
};
