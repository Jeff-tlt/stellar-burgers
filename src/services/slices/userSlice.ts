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
}

const initialState: UserState = {
  user: null,

  isAuthChecked: false,

  isAuthenticated: false
};

export const getUser = createAsyncThunk(
  'user/getUser',

  async () => getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',

  async (data: {
    email: string;

    password: string;
  }) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/registerUser',

  async (data: {
    email: string;

    password: string;

    name: string;
  }) => registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',

  async (data: {
    name: string;

    email: string;
  }) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',

  async () => logoutApi()
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
      })

      .addCase(getUser.rejected, (state) => {
        state.user = null;

        state.isAuthenticated = false;

        state.isAuthChecked = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.isAuthChecked = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.isAuthChecked = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.isAuthenticated = false;

        state.isAuthChecked = true;
      });
  }
});

export default userSlice.reducer;
