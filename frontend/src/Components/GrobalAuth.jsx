import { useContext } from 'react';
import AuthContext from './Components/AuthContext';

const SomeComponent = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);


};
