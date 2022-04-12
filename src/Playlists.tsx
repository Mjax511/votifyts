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

  const onClick = (options: { playlist: string }) => {
    const { playlist } = options;
    navigate(`/playlists/${playlist}`);
  };

  const listPlaylists = (list: FetchData) => {
    return list.items.map((playlist, i) => {
      const playlistId = data.items[i].id;
      return (
        <ListItem
          _hover={{ bg: 'gray.100' }}
          p="2"
          display="flex"
          alignItems="baseline"
          borderBottom="1px"
          borderColor="gray.400"
          key={playlistId}
          onClick={() => onClick({ playlist: playlistId })}
        >
          <Text pl="3" fontSize="lg">
            {playlist.name}
          </Text>
          <Spacer />
          <Text pr="3" color="gray.400" fontSize="sm">{`${
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
