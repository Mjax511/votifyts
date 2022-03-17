import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { AuthCheck } from "./AuthCheck";
import { Homepage } from "./Homepage";
import { useAuth, ProvideAuth } from "./AuthContext";
import { Test3 } from "./Test3";

function App() {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/login" element={<LoginButton />} />
        <Route path="/" element={<Test myString="test from test" />} />
        <Route path="/auth-check" element={<AuthCheck />} />
        <Route path="/home" element={<Homepage />} />
        <Route
          path="/test"
          element={
            <Test2 myString="test from test2">
              <Test myString={`${useAuth()?.user}`} />
            </Test2>
          }
        />
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
  useAuth()?.setUser("mjax")
  return <div>{`${useAuth()?.user}`}</div>;
};

export default App;
