import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  signInData: {},
  signUpData: {},
};

const slice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    LoginizationAC: (state, action) => {
      state.signInData = action.payload.data;
    },
    AuthorizationAC: (state, action) => {
      state.signUpData = action.payload.data;
    },
  },
});

export const appAuthorizationReducer = slice.reducer;

export const {LoginizationAC, AuthorizationAC} = slice.actions;
