// authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {mixpanel} from '../../..';
import {trackEvent} from '../../utils/analytics';
import {events} from '../../utils/eventsNames';
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
        state.userData = getUser;
        mixpanel.identify(getUser?.id);
        mixpanel.getPeople().set('$username', getUser?.username);
        mixpanel.getPeople().set('$email', getUser?.email);
        mixpanel.getPeople().set('$name', getUser?.name);
        trackEvent(events.Login, {
          name: getUser?.name,
          email: getUser?.email,
          phone: getUser?.phone,
          userId: getUser?.id,
        });
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
