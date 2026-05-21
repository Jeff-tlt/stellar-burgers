import { FC, ReactElement } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: ReactElement;

  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,

  onlyUnAuth = false
}) => {
  const location = useLocation();

  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return null;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || {
      pathname: '/'
    };

    return <Navigate to={from} replace />;
  }

  return children;
};
