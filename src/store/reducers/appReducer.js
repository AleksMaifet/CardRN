import {
  APP_ACTION_TYPES,
  APP_CARDS_TYPES,
  APP_PACKS_TYPES,
} from 'src/store/actions/actionTypes';

// export type IsLoadType = 'idle' | 'loading' | 'success';

const initState = {
  isLoading: 'idle',
  isRefreshListLoading: 'idle',
  packs: {
    cardPacks: [],
  },
  cards: {
    cards: [],
  },
};

export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_ACTION_TYPES.APP_IS_LOADING:
    case APP_ACTION_TYPES.APP_IS_LOADING_REFRESH_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case APP_PACKS_TYPES.APP_GET_PACKS:
      return {
        ...state,
        packs: action.data,
      };
    case APP_PACKS_TYPES.APP_SET_NEXT_PACK:
      return {
        ...state,
        packs: {
          ...action.data,
          cardPacks: [...state.packs.cardPacks, ...action.data.cardPacks],
        },
      };
    case APP_PACKS_TYPES.APP_CHANGE_PACK_TITLE:
      return {
        ...state,
        packs: {
          ...state.packs,
          cardPacks: state.packs.cardPacks.map(el =>
            el._id === action.id ? {...el, name: action.name} : el,
          ),
        },
      };
    case APP_ACTION_TYPES.APP_UPDATE_TOTAL_PACKS_COUNT:
      return {
        ...state,
        packs: {
          ...state.packs,
          ...action.payload,
        },
      };
    case APP_PACKS_TYPES.APP_SET_DELETE_PACK:
      return {
        ...state,
        packs: {
          ...state.packs,
          cardPacks: state.packs.cardPacks.filter(
            ({_id}) => _id !== action.packId,
          ),
        },
      };
    case APP_CARDS_TYPES.APP_GET_CARDS:
      return {
        ...state,
        cards: action.data,
      };
    case APP_ACTION_TYPES.APP_UPDATE_TOTAL_CARDS_COUNT:
      return {
        ...state,
        cards: {
          ...state.cards,
          ...action.payload,
        },
      };
    case APP_CARDS_TYPES.APP_DELETE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          cards: state.cards.cards.filter(({_id}) => _id !== action.cardId),
        },
      };
    default:
      return state;
  }
};
