import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/store';

import { IngredientDetailsUI } from '../ui/ingredient-details';

import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useSelector((state) => state.ingredients.items);

  const ingredientData = ingredients.find(
    (item: TIngredient) => item._id === id
  );

  if (!ingredientData) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

export default IngredientDetails;
