import { FC } from 'react';

import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '../ui/burger-ingredient';

import { TIngredient } from '../../utils/types';

import { useDispatch } from '../../services/store';

import { addIngredient } from '../../services/slices/constructorSlice';

type Props = {
  ingredient: TIngredient;
  count?: number;
};

export const BurgerIngredient: FC<Props> = ({ ingredient, count = 0 }) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const handleAdd = () => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      handleAdd={handleAdd}
      locationState={{ background: location }}
    />
  );
};
