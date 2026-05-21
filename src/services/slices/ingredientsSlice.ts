import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../utils/burger-api';

import { TIngredient } from '../../utils/types';

interface IngredientsState {
  items: TIngredient[];

  isLoading: boolean;

  error: string | null;
}

const initialState: IngredientsState = {
  items: [],

  isLoading: false,

  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',

  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;

        state.items = action.payload;
      })

      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;

        state.error = 'Ошибка загрузки ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;
