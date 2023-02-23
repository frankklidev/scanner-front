import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { showMessage } from "../../shared/redux/message";
import { IUser } from '../types/index';
import usersService from "../services";

interface IUserState {
  loadingUsers: boolean;
  users: IUser[];
}

const initialState: IUserState = {
  loadingUsers: false,
  users: [],
};

export const getUsers = createAsyncThunk(
  "get/users",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await usersService.getItems<IUser[]>(input);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue([]);
    }
  }
);
export const getUserById = createAsyncThunk(
  "get/user",
  async (
    userId: string,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await usersService.getItemById<IUser>(userId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue(undefined);
    }
  }
);
export const createUser = createAsyncThunk(
  "post/users",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await usersService.createItem<IUser, IUser>(
        input
      );
      dispatch(
        showMessage({
          severity: "success",
          summary: "User successfully registered",
        })
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue(undefined);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(getUsers.fulfilled, (state, payload) => {
      state.loadingUsers = false;
      state.users = payload.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loadingUsers = false;
      state.users = [];
    });
    builder.addCase(createUser.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(createUser.fulfilled, (state, payload) => {
      state.loadingUsers = false;
      state.users.push(payload.payload);
    });
    builder.addCase(createUser.rejected, (state) => {
      state.loadingUsers = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersSelector = (state: RootState): IUserState =>
  state.users;
export default usersReducer;
