import { FC, useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '../ui/burger-ingredient';

import { TIngredient } from '../../utils/types';

import { useDispatch, useSelector } from '../../services/store';

import { addIngredient } from '../../services/slices/constructorSlice';

type Props = {
  ingredient: TIngredient;
  count?: number;
};

export const BurgerIngredient: FC<Props> = ({ ingredient }) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const count = useMemo(() => {
    const bunCount = constructorItems.bun?._id === ingredient._id ? 2 : 0;

    const ingredientsCount = constructorItems.ingredients.filter(
      (item) => item._id === ingredient._id
    ).length;

    return bunCount + ingredientsCount;
  }, [constructorItems, ingredient]);

  const handleAdd = () => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count > 0 ? count : undefined}
      handleAdd={handleAdd}
      locationState={{ background: location }}
    />
  );
};
