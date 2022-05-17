import {IsLoadingAC} from 'src/store/actions';

export const handleSpinnerTimerEnd = (dispatch, ms) => {
  setTimeout(() => {
    dispatch(IsLoadingAC('success'));
  }, ms);
};
