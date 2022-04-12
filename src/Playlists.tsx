import React, { useState } from 'react';
import { useHandleFetchAndLoad } from './useHandleFetchAndLoad';
import { useNavigate } from 'react-router-dom';
import { Text, List, ListItem, Spinner, Box, Spacer } from '@chakra-ui/react';

type FetchData = {
  items: Array<{ name: string; id: string; tracks: any }>;
  total: number;
};

export const Playlists: React.FC = () => {
  const navigate = useNavigate();
  const [hoverItem, setHoverItem] = useState<null | number>(null);
  const endpoint = 'https://api.spotify.com/v1/me/playlists';

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${sessionStorage.accessToken}`);

  const requestoptions = {
    method: 'get',
    headers: myHeaders,
    redirect: 'follow',
  };

  const [loading, data] = useHandleFetchAndLoad<FetchData>({
    endpoint,
    requestOptions: requestoptions,
  });

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (!data) {
    //checks to make sure data exists otherwise data needs to be data?
    return <Box>Playlist Loading from {endpoint}</Box>;
  }

  const onClick = (options: { key: number }) => {
    const { key } = options;
    navigate(`/playlists/${data.items[key].id}`);
  };
  const handleHover = (options: { key: number | null }) => {
    const { key } = options;
    if (key || key === 0) setHoverItem(key);
    if (key === null) setHoverItem(null);
  };

  const listPlaylists = (list: FetchData) => {
    return list.items.map((playlist, i) => {
      return (
        <ListItem
          p="2"
          display="flex"
          alignItems="baseline"
          borderBottom="1px"
          borderColor="gainsboro"
          key={i}
          onMouseEnter={() => handleHover({ key: i })}
          onMouseLeave={() => handleHover({ key: null })}
          onClick={() => onClick({ key: i })}
          bg={hoverItem === i ? 'gainsboro' : ''}
        >
          <Text pl="3" fontSize="lg">
            {playlist.name}
          </Text>
          <Spacer />
          <Text pr="3" color="gainsboro" fontSize="sm">{`${
            playlist.tracks.total
          } ${playlist.tracks.total === 1 ? 'song' : 'songs'}`}</Text>
        </ListItem>
      );
    });
  };
  return (
    <Box>
      <List pt="5">{listPlaylists(data)}</List>
    </Box>
  );
};
