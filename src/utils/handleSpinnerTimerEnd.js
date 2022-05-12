import {IsLoadingAC} from 'src/store/actions';

export const handleSpinnerTimerEnd = (dispatch, ms = 800) => {
  setTimeout(() => {
    dispatch(IsLoadingAC('success'));
  }, ms);
};
