import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';

import { TOrder } from '../../utils/types';

type FeedState = {
  orders: TOrder[];

  loading: boolean;

  error: string | null;
};

const initialState: FeedState = {
  orders: [],

  loading: false,

  error: null
};

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',

  async () => {
    const response = await getFeedsApi();

    return response.orders;
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

        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;

          state.orders = action.payload;
        }
      )

      .addCase(getFeeds.rejected, (state) => {
        state.loading = false;

        state.error = 'Ошибка загрузки заказов';
      });
  }
});

export default feedSlice.reducer;
