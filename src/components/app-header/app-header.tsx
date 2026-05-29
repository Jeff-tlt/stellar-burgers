import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const location = useLocation();

  const userName = useSelector((state) => state.user.user?.name);

  return (
    <AppHeaderUI
      userName={userName || ''}
      isConstructorActive={
        location.pathname === '/' ||
        location.pathname.startsWith('/ingredients')
      }
      isFeedActive={location.pathname.startsWith('/feed')}
      isProfileActive={location.pathname.startsWith('/profile')}
    />
  );
};
