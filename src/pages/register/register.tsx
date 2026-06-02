import { FC, SyntheticEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from '../../services/store';

import { registerUser } from '../../services/slices/userSlice';

import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={onSubmit}
    />
  );
};
