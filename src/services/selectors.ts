import { RootState } from './store';

export const ingredientsSelector = (state: RootState) =>
  state.ingredients.items;

export const constructorSelector = (state: RootState) =>
  state.burgerConstructor;

export const userSelector = (state: RootState) => state.user;

export const orderSelector = (state: RootState) => state.order;
