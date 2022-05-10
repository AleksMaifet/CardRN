import {APP_AUTHORIZATION_TYPES} from 'src/store/actions/actionTypes';

const initState = {
  signInData: {},
  signUpData: {},
};

export const appAuthorizationReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_AUTHORIZATION_TYPES.APP_LOGINIZATION_DATA:
    case APP_AUTHORIZATION_TYPES.APP_AUTHORIZATION_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
