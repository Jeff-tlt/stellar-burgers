import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';

import { TOrder } from '../../utils/types';

type FeedState = {
  orders: TOrder[];

  profileOrders: TOrder[];

  total: number;

  totalToday: number;

  loading: boolean;

  error: string | null;
};

const initialState: FeedState = {
  orders: [],

  profileOrders: [],

  total: 0,

  totalToday: 0,

  loading: false,

  error: null
};

type TFeedsResponse = {
  orders: TOrder[];

  total: number;

  totalToday: number;
};

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',

  async () => {
    const response = await getFeedsApi();

    return response;
  }
);

export const getProfileOrders = createAsyncThunk(
  'feed/getProfileOrders',

  async () => {
    const response = await getOrdersApi();

    return response;
  }
);

const feedSlice = createSlice({
  name: 'feed',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getFeeds.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(
        getFeeds.fulfilled,

        (state, action: PayloadAction<TFeedsResponse>) => {
          state.loading = false;

          state.orders = action.payload.orders;

          state.total = action.payload.total;

          state.totalToday = action.payload.totalToday;
        }
      )

      .addCase(getFeeds.rejected, (state) => {
        state.loading = false;

        state.error = 'Ошибка загрузки заказов';
      })

      .addCase(
        getProfileOrders.fulfilled,

        (state, action: PayloadAction<TOrder[]>) => {
          state.profileOrders = action.payload;
        }
      );
  }
});

export default feedSlice.reducer;
