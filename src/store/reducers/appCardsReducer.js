import {createSlice} from '@reduxjs/toolkit';
import {GetCardsTC} from 'src/store/thunks';

const slice = createSlice({
  name: 'cards',
  initialState: {
    cards: {
      cards: [],
    },
    cardQuestion: null,
    pageCount: 100,
  },
  reducers: {
    DeleteCardAC: (state, action) => {
      const {cards} = state.cards;
      const index = cards.findIndex(({_id}) => _id === action.payload.id);
      if (index !== -1) {
        cards.splice(index, 1);
      }
    },
    UpdateTotalCardsCountAC: (state, action) => {
      state.cards.cardsTotalCount = action.payload.cardsTotalCount;
    },
    SearchCardQuestionNameAC: (state, action) => {
      state.cardQuestion = action.payload.question;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetCardsTC.fulfilled, (state, action) => {
      state.cards = action.payload.cards;
    });
  },
});

export const appCardsReducer = slice.reducer;

export const {
  DeleteCardAC,
  UpdateTotalCardsCountAC,
  SearchCardQuestionNameAC,
} = slice.actions;
