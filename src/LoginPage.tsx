import React from "react";
import { useAuth } from "./AuthContext";
import { Button, Box } from "@chakra-ui/react";

export const LoginPage = () => {
  const auth = useAuth();
  return (
    <Box>
      <h2> You are not logged in</h2>
      <Button onClick={auth?.signIn}>Login</Button>
    </Box>
  );
};
