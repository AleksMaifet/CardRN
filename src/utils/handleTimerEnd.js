import {IsLoadingAC} from 'src/store/reducers';

export const handleTimerEnd = (dispatch, ms = 1) => {
  setTimeout(() => {
    dispatch(IsLoadingAC({isLoading: 'success'}));
  }, ms);
};
