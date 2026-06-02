import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { orderBurgerApi } from '../../utils/burger-api';

import { TOrder } from '../../utils/types';

type OrderResponse = {
  order: TOrder;
};

type OrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',

  async (ingredients: string[]): Promise<TOrder> => {
    const response = (await orderBurgerApi(ingredients)) as OrderResponse;

    return response.order;
  }
);

const orderSlice = createSlice({
  name: 'order',

  initialState,

  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(
        createOrder.fulfilled,

        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;

          state.order = action.payload;
        }
      )

      .addCase(createOrder.rejected, (state) => {
        state.loading = false;

        state.error = 'Ошибка создания заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
