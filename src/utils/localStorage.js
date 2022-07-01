import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginizationAC} from 'src/store/reducers';

export const loadState = async dispatch => {
  try {
    const serializedState = await AsyncStorage.getItem('authorization');
    if (serializedState === null) {
      return undefined;
    }
    const data = JSON.parse(serializedState);
    dispatch(LoginizationAC({data}));
    return 'bla';
  } catch (err) {
    return undefined;
  }
};

export const saveState = async value => {
  try {
    const serializedState = JSON.stringify(value);
    await AsyncStorage.setItem('authorization', serializedState);
  } catch (err) {
    return undefined;
  }
};

export const removeState = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed');
  } catch (err) {
    return undefined;
  }
};
