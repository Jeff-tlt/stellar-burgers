import { FC, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '../ui/burger-constructor';

import { useDispatch, useSelector } from '../../services/store';

import { clearConstructor } from '../../services/slices/constructorSlice';

import { createOrder, clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const { bun, ingredients } = constructorItems;

  const { isAuthenticated } = useSelector((state) => state.user);

  const orderState = useSelector((state) => state.order);

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    console.log('AUTH CHECK', isAuthenticated);

    if (!isAuthenticated) {
      navigate('/login');

      return;
    }

    if (!bun) {
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds)).then((res) => {
      if (createOrder.fulfilled.match(res)) {
        dispatch(clearConstructor());
      }
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      orderRequest={orderState.loading}
      orderModalData={orderState.order}
      price={totalPrice}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

export default BurgerConstructor;
