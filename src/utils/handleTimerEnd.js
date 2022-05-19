import {IsLoadingAC} from 'src/store/actions';

export const handleTimerEnd = (dispatch, ms = 1) => {
  setTimeout(() => {
    dispatch(IsLoadingAC('success'));
  }, ms);
};
