import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  errorAuthorizationMessage: null,
  errorUploadAvatarMessage: null,
};

const slice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    AuthorizationErrorAC: (state, action) => {
      state.errorAuthorizationMessage = action.payload.error;
    },
    UploadAvatarErrorAC: (state, action) => {
      state.errorUploadAvatarMessage = action.payload.error;
    },
  },
});

export const appErrorReducer = slice.reducer;

export const {AuthorizationErrorAC, UploadAvatarErrorAC} = slice.actions;
