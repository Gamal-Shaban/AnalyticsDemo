// authSlice.js
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
  },
  reducers: {
    changeLoginFirstTime(state, action) {
      state.loginFirstTime = action.payload;
    },
  },
});

export const {changeLoginFirstTime} = authSlice.actions;

export default authSlice.reducer;
