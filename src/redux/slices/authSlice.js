// authSlice.js
import {createSlice} from '@reduxjs/toolkit';
const userList = [
  {token: 'abc123', username: 'test1', password: '123'},
  {token: 'def456', username: 'test2', password: '1234'},
  {token: 'ghi789', username: 'test3', password: '12345'},
];

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    errorMessage: null,
  },
  reducers: {
    login(state, action) {
      state.errorMessage = null;
      const getUser = userList?.find(
        user =>
          user.username === action?.payload?.username &&
          user.password === action?.payload.password,
      );
      if (getUser) {
        alert(getUser);
        state.userData = getUser;
      } else {
        state.errorMessage = 'Invalid username or password';
      }
    },
    logOut(state) {
      state.userData = null;
      state.errorMessage = null;
    },
  },
});

export const {login, logOut} = authSlice.actions;

export default authSlice.reducer;
