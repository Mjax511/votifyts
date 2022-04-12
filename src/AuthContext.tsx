import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  MouseEvent,
} from 'react';

import { useNavigate } from 'react-router-dom';

interface AuthContextInterface {
  user: string | null;
  signIn: (e: MouseEvent<HTMLButtonElement>) => void;
  setUser: (user: string) => void;
  signOut: (e: MouseEvent<HTMLButtonElement>) => void;
}
const AuthContext = createContext<AuthContextInterface | null>(null);

export const ProvideAuth: React.FC<{}> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
// export function ProvideAuth( { children } : React.PropsWithChildren<{}> )  {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }
//// Hook for child components to get the auth object ...
//// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};
//// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  //  // Wrap any Firebase methods we want to use making sure ...
  //  // ... to save the user to state.
  const signIn = (e: MouseEvent<HTMLButtonElement>) => {
    sessionStorage.setItem('accessToken', '');
    console.log('sign in has run');
    const redirect_uri = 'http://localhost:3000/auth-check';
    const my_client_id = 'd61d9c2cce0241c1bee240e797303b23';
    const scopes = 'playlist-read-collaborative playlist-modify-public';
    //const authHeader = 'Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q='
    const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${my_client_id}${
      scopes ? '&scope=' + encodeURIComponent(scopes) : ''
    }&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    window.location.href = spotifyAuthURI;
  };

  const signOut = (e: MouseEvent<HTMLButtonElement>) => {
    setUser(null);
    sessionStorage.clear();
    navigate('login');
  };

  // Return the user object and auth methods
  return {
    user,
    signIn,
    setUser,
    signOut,
  };
}
