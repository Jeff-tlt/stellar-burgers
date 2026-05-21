import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TIngredient } from '../../utils/types';

interface ConstructorState {
  bun: TIngredient | null;

  ingredients: TIngredient[];
}

const initialState: ConstructorState = {
  bun: null,

  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',

  initialState,

  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },

    clearConstructor: (state) => {
      state.bun = null;

      state.ingredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;

export default constructorSlice.reducer;
