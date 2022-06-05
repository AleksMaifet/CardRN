import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: 'idle',
  isRefreshListLoading: 'idle',
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    IsLoadingAC: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    IsLoadingRefreshListAC: (state, action) => {
      state.isRefreshListLoading = action.payload.isLoading;
    },
  },
});

export const appReducer = slice.reducer;

export const {IsLoadingAC, IsLoadingRefreshListAC} = slice.actions;
