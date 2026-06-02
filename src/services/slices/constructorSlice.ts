import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '../../utils/types';

interface ConstructorState {
  bun: TIngredient | null;

  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,

  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',

  initialState,

  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },

      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index <= 0) return;

      [state.ingredients[index - 1], state.ingredients[index]] = [
        state.ingredients[index],
        state.ingredients[index - 1]
      ];
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index >= state.ingredients.length - 1) return;

      [state.ingredients[index + 1], state.ingredients[index]] = [
        state.ingredients[index],
        state.ingredients[index + 1]
      ];
    },

    clearConstructor: (state) => {
      state.bun = null;

      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
