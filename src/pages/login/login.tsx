import { FC, SyntheticEvent, useState } from 'react';

import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

import { loginUser } from '../../services/slices/userSlice';

import { Navigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password
      })
    );
  };

  if (isAuthenticated) {
    const from = location.state?.from || '/';

    return <Navigate to={from} />;
  }

  return (
    <LoginUI
      errorText=""
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
