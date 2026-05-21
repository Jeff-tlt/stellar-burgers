import { ProfileOrdersUI } from '@ui-pages';

import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';

import { getFeeds } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
