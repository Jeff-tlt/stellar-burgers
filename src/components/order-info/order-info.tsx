import { FC, useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';

import { getFeeds, getProfileOrders } from '../../services/slices/feedSlice';

import { getOrderByNumberApi } from '../../utils/burger-api';

import { Preloader } from '../ui/preloader';

import { OrderInfoUI } from '../ui/order-info';

import { TIngredient, TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const { number } = useParams();

  const ingredients = useSelector((state) => state.ingredients.items);

  const feedOrders = useSelector((state) => state.feed.orders);

  const profileOrders = useSelector((state) => state.feed.profileOrders || []);

  const [fallbackOrder, setFallbackOrder] = useState<TOrder | null>(null);

  useEffect(() => {
    if (!feedOrders.length) {
      dispatch(getFeeds());
    }

    if (!profileOrders.length) {
      dispatch(getProfileOrders());
    }
  }, [dispatch, feedOrders.length, profileOrders.length]);

  const orderData =
    feedOrders.find((o) => o.number === Number(number)) ||
    profileOrders.find((o) => o.number === Number(number)) ||
    fallbackOrder;

  useEffect(() => {
    if (!orderData && number) {
      getOrderByNumberApi(Number(number)).then((data) => {
        setFallbackOrder(data);
      });
    }
  }, [number, orderData]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);

          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
