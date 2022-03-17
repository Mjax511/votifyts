import React from "react";
import { useAuth } from "./AuthContext";

export const LoginButton = () => {
  const auth = useAuth();
  return (
    <div>
      <h2> You are not logged in</h2>
      <button onClick={auth?.signIn}>Login</button>
    </div>
  );
};
