import {APP_AUTHORIZATION_TYPES} from 'src/store/actions/actionTypes';

const initState = {
  errorAuthorizationMessage: null,
};

export const appErrorReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_AUTHORIZATION_TYPES.APP_AUTHORIZATION_ERROR_DATA:
      return {
        ...state,
        errorAuthorizationMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
