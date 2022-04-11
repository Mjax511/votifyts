import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { AuthCheck } from './AuthCheck';
import { Homepage } from './Homepage';
import { Playlist } from './Playlist';
import { Playlists } from './Playlists';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth, ProvideAuth } from './AuthContext';
import { Test3 } from './Test3';

function App() {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/Playlists" />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/:playlistId" element={<Playlist />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth-check" element={<AuthCheck />} />
        <Route
          path="/test"
          element={<Test myString={`${useAuth()?.user}`} />}
        />
        <Route path="*" element={<Catch />} />
      </Routes>
    </ProvideAuth>
  );
}

function Test(props: { myString: string | null }): React.ReactElement | null {
  return <div>{props.myString}</div>;
  return <div>{useAuth()?.user}</div>;
}

const Test2: React.FC<{ myString: string | null }> = () => {
  // return <div>{props.children}</div>; //why
  useAuth()?.setUser('mjax');
  return <div>{`${useAuth()?.user}`}</div>;
};
const Catch: React.FC = () => {
  return <div>Route does not exist</div>;
};

export default App;
