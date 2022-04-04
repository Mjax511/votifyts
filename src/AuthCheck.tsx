import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

const HandleAuth: React.FC<{ authCode: string }> = ({ authCode }) => {
  const endpoint = "https://accounts.spotify.com/api/token";

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q="
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "__Host-device_id=AQAM2Cs4CAqkO60Mhy0ZjxJkalvjJGJ43zV2Z9tqxYKbJ-Mz2V6LkE3lBe1wcks2KIwCN1ZElxxWq74EmV0Eya99KiVCol8dEWk"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", authCode);
  urlencoded.append("redirect_uri", "http://localhost:3000/auth-check");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const [loading, data, error] = useHandleFetchAndLoad<{
    access_token: string;
  }>({ endpoint, requestOptions });

  if (loading) {
    return <div>Loading from {endpoint}</div>;
  }

  if (!data || error) {
    return <div>{`error: ${error}!!!`}</div>;
  }
  if (!data?.access_token || error) {
    return <div>{`error: ${error}!!!`}</div>;
  }
  sessionStorage.setItem("accessToken", data.access_token);
  return <Navigate to="/" />;
};
export const AuthCheck: React.FC<{}> = () => {
  const authCode = window.location.href.split("?")[1]
    ? window.location.href.split("?")[1].split("=")[1]
    : null;
  if (authCode && !sessionStorage.getItem("accessToken")) {
    return <HandleAuth authCode={authCode} />;
  }

  // prevents user from goint to /auth-check uri
  console.log(window.location.href.split("?"));
  if (
    window.location.href.split("?")[0] === "http://localhost:3000/auth-check"
  ) {
    return <Navigate to="/" />;
  }
  return <Navigate to="/login" />;
};
