import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';

import { TUser } from '../../utils/types';

interface UserState {
  user: TUser | null;

  isAuthChecked: boolean;

  isAuthenticated: boolean;

  error: string | null;
}

const initialState: UserState = {
  user: null,

  isAuthChecked: false,

  isAuthenticated: false,

  error: null
};

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: { email: string; password: string }) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: { email: string; password: string; name: string }) =>
    registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { name: string; email: string }) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () =>
  logoutApi()
);

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.isAuthChecked = true;

        state.error = null;
      })

      .addCase(getUser.rejected, (state) => {
        state.user = null;

        state.isAuthenticated = false;

        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.isAuthChecked = true;

        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось войти';
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.isAuthChecked = true;

        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось зарегистрироваться';
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.error = null;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось обновить профиль';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.isAuthenticated = false;

        state.isAuthChecked = true;

        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось выйти';
      });
  }
});

export default userSlice.reducer;
