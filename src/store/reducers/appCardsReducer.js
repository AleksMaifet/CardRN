import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cards: {
    cards: [],
  },
  cardQuestion: null,
  pageCount: 100,
};

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    GetCardsAC: (state, action) => {
      state.cards = action.payload.cards;
    },
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
});

export const appCardsReducer = slice.reducer;

export const {
  GetCardsAC,
  DeleteCardAC,
  UpdateTotalCardsCountAC,
  SearchCardQuestionNameAC,
} = slice.actions;
