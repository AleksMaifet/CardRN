import {APP_CARDS_TYPES} from 'src/store/actions/actionTypes';

const initState = {
  cardQuestion: null,
  cardPackId: null,
  pageCount: 100,
};

export const appCardsReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_CARDS_TYPES.APP_SET_CARD_PACK_ID:
    case APP_CARDS_TYPES.APP_SET_SEARCH_CARD_QUESTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
