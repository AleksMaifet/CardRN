import {createSlice} from '@reduxjs/toolkit';
import {LoginizationTC, LogOutTC} from 'src/store/thunks';

const slice = createSlice({
  name: 'authorization',
  initialState: {
    signInData: {},
    signUpData: {},
  },
  reducers: {
    LoginizationAC: (state, action) => {
      state.signInData = action.payload.data;
    },
    AuthorizationAC: (state, action) => {
      state.signUpData = action.payload.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(LoginizationTC.fulfilled, (state, action) => {
      state.signInData = action.payload.data;
    });
    builder.addCase(LogOutTC.fulfilled, (state, action) => {
      state.signInData = action.payload.data;
      state.signUpData = action.payload.data;
    });
  },
});

export const appAuthorizationReducer = slice.reducer;

export const {LoginizationAC, AuthorizationAC} = slice.actions;
