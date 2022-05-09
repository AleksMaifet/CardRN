import Alert from 'react-native/Libraries/Alert/Alert';
import {AuthorizationErrorAC} from 'src/store/actions';

export const handleServerError = (err, dispatch) => {
  const errorMassage = err.response.data.error;
  errorMassage ? Alert.alert(errorMassage) : 'Check internet connection!';
  dispatch(AuthorizationErrorAC(errorMassage));
};
