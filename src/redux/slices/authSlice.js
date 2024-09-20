// authSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const userList = [
  {
    id: '1111111',
    token: 'abc123',
    username: 'test1',
    password: '123',
    email: 'test1@test1.com',
    name: 'Test User 1',
    phone: '123',
  },
  {
    id: '2222222',
    token: 'def456',
    username: 'test2',
    password: '1234',
    email: 'test2@test2.com',
    name: 'Test User 2',
    phone: '456',
  },
  {
    id: '3333333',
    token: 'ghi789',
    username: 'test3',
    password: '12345',
    email: 'test2@test2.com',
    name: 'Test User 3',
    phone: '789',
  },
];

export const login = createAsyncThunk(
  'auth/login',
  async (payload, {rejectWithValue}) => {
    try {
      // Simulate fetching user data (you can replace this with a real API call)

      // Find the user in the user list
      const getUser = userList.find(
        user =>
          user.username === payload?.username &&
          user.password === payload?.password,
      );

      if (getUser) {
        // Return user data if found
        return getUser;
      } else {
        // If user not found, return error
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      // Catch any other errors
      return rejectWithValue('An error occurred during login');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    errorMessage: null,
    status: 'idle',
  },
  extraReducers: builder => {
    builder
      // Handle pending state
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      // Handle fulfilled state (successful login)
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload; // Set user data
      })
      // Handle rejected state (login failure)
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload || 'Login failed';
      });
  },
  reducers: {
    logOut(state) {
      state.userData = null;
      state.errorMessage = null;
    },
  },
});

export const {logOut} = authSlice.actions;

export default authSlice.reducer;
