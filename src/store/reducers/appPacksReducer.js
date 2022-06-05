import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  packs: {
    cardPacks: [],
  },
  pack: null,
  searchPackName: null,
  pageCount: 6,
};

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    GetPacksAC: (state, action) => {
      state.packs = action.payload.packs;
    },
    SetNextPackAC: (state, action) => {
      state.packs = {
        ...action.payload.data,
        cardPacks: state.packs.cardPacks.concat(action.payload.data.cardPacks),
      };
    },
    UpdatePackTitleAC: (state, action) => {
      state.pack.name = action.payload.name;
      const {cardPacks} = state.packs;
      const index = cardPacks.findIndex(el => el._id === action.payload.id);
      if (index !== -1) {
        cardPacks[index].name = action.payload.name;
      }
    },
    SetPackAC: (state, action) => {
      const {cardPacks} = state.packs;
      const index = cardPacks.findIndex(el => el._id === action.payload.id);
      state.pack = cardPacks[index];
    },
    SearchPackNameAC: (state, action) => {
      state.searchPackName = action.payload.title;
    },
  },
});

export const appPacksReducer = slice.reducer;

export const {
  GetPacksAC,
  SetNextPackAC,
  UpdatePackTitleAC,
  SetPackAC,
  SearchPackNameAC,
} = slice.actions;
