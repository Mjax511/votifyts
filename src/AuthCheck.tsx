import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useHandleFetchAndLoad } from './useHandleFetchAndLoad';
import { Spinner } from '@chakra-ui/react';
import { useAuth } from './AuthContext';

const HandleAuth: React.FC<{ authCode: string }> = ({ authCode }) => {
  const endpoint = 'https://accounts.spotify.com/api/token';

  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q='
  );
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append(
    'Cookie',
    '__Host-device_id=AQAM2Cs4CAqkO60Mhy0ZjxJkalvjJGJ43zV2Z9tqxYKbJ-Mz2V6LkE3lBe1wcks2KIwCN1ZElxxWq74EmV0Eya99KiVCol8dEWk'
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'authorization_code');
  urlencoded.append('code', authCode);
  urlencoded.append('redirect_uri', 'http://localhost:3000/auth-check');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const [loading, data, error] = useHandleFetchAndLoad<{
    access_token: string;
  }>({ endpoint, requestOptions });

  if (loading) {
    return <Spinner />;
  }

  if (!data || error) {
    return <div>{`error: ${error}!!!`}</div>;
  }
  if (!data?.access_token || error) {
    return <div>{`error: ${error}!!!`}</div>;
  }

  sessionStorage.setItem('accessToken', data.access_token);
  // should maybe handle isLoggedIn here

  return <Navigate to="/" />;
};
export const AuthCheck: React.FC<{}> = () => {
  const url = window.location.search;
  const searchParams = new URLSearchParams(url);
  const authCode = searchParams.get('code');

  if (authCode && !sessionStorage.getItem('accessToken')) {
    return <HandleAuth authCode={authCode} />;
  }

  return <Navigate to="/login" />;
};
