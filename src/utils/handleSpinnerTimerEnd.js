import {IsLoadingAC} from 'src/store/actions';

export const handleSpinnerTimerEnd = (dispatch, ms = 1) => {
  setTimeout(() => {
    dispatch(IsLoadingAC('success'));
  }, ms);
};
