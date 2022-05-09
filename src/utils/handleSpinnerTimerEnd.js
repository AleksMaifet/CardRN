import {IsLoadingAC} from 'src/store/actions';

export const handleSpinnerTimerEnd = dispatch => {
  setTimeout(() => {
    dispatch(IsLoadingAC('success'));
  }, 800);
};
