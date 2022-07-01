import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    isLoading: 'idle',
    isRefreshListLoading: 'idle',
  },
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
