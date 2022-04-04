import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { AuthCheck } from "./AuthCheck";
import { Homepage } from "./Homepage";
import { Playlist } from "./Playlist";
import { Playlists } from "./Playlists";
import { useAuth, ProvideAuth } from "./AuthContext";
import { Test3 } from "./Test3";

function App() {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/login" element={<LoginButton />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<Playlist />} />
        <Route path="/auth-check" element={<AuthCheck />} />
        <Route
          path="/test"
          element={
            <Test2 myString="test from test2">
              <Test myString={`${useAuth()?.user}`} />
            </Test2>
          }
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
  useAuth()?.setUser("mjax");
  return <div>{`${useAuth()?.user}`}</div>;
};
const Catch: React.FC = () => {
  return <div>Route does not exist</div>;
};

export default App;
