import {APP_PACKS_TYPES} from 'src/store/actions/actionTypes';

const initState = {
  searchPackName: null,
  pageCount: null,
  cardPacksTotalCount: null,
};

export const appPacksReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_PACKS_TYPES.APP_SET_SEARCH_PACK_NAME:
    case APP_PACKS_TYPES.APP_SET_MAX_COUNT_PAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
