import React from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@chakra-ui/react";

export const LoginButton = () => {
  const auth = useAuth();
  return (
    <div>
      <h2> You are not logged in</h2>
      <Button onClick={auth?.signIn}>Login</Button>
    </div>
  );
};
