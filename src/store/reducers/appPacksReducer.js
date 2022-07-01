import {createSlice} from '@reduxjs/toolkit';
import {
  GetNextPackTC,
  GetPacksTC,
  RefreshPacksTC,
  UpdatePackTitleTC,
} from 'src/store/thunks';

const slice = createSlice({
  name: 'packs',
  initialState: {
    packs: {
      cardPacks: [],
    },
    pack: null,
    searchPackName: null,
    pageCount: 6,
  },
  reducers: {
    SetPackAC: (state, action) => {
      const {cardPacks} = state.packs;
      const index = cardPacks.findIndex(el => el._id === action.payload.id);
      state.pack = cardPacks[index];
    },
    SearchPackNameAC: (state, action) => {
      state.searchPackName = action.payload.title;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetPacksTC.fulfilled, (state, action) => {
      state.packs = action.payload.packs;
    });
    builder.addCase(RefreshPacksTC.fulfilled, (state, action) => {
      state.packs = action.payload.packs;
    });
    builder.addCase(GetNextPackTC.fulfilled, (state, action) => {
      state.packs = {
        ...action.payload.data,
        cardPacks: state.packs.cardPacks.concat(action.payload.data.cardPacks),
      };
    });
    builder.addCase(UpdatePackTitleTC.fulfilled, (state, action) => {
      state.pack.name = action.payload.name;
      const {cardPacks} = state.packs;
      const index = cardPacks.findIndex(el => el._id === action.payload.id);
      if (index !== -1) {
        cardPacks[index].name = action.payload.name;
      }
    });
  },
});

export const appPacksReducer = slice.reducer;

export const {SetPackAC, SearchPackNameAC} = slice.actions;
