import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#21268F',
  secondary: '#fff',

  black: '#2D2E46',
  purple: '#954AA1',
  red: '#f66',
  green: '#008000',
  gray: 'rgba(158, 150, 150, 0.7)',
  crimson: '#900',
  purplish_pink: '#E6D4DE',
  purplish_blue: '#9890C7',
};

export const SIZES = {
  h1: 22,
  h2: 16,
  h3: 14,
  body1: 30,
  body2: 22,
  body3: 16,

  width,
  height,
};

export const styles = StyleSheet.create({
  fonts: {
    h1: {
      fontFamily: 'Poppins-Bold',
      fontSize: SIZES.h1,
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: 'Poppins-Bold',
      fontSize: SIZES.h2,
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: 'Poppins-Bold',
      fontSize: SIZES.h3,
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'Poppins-Regular',
      fontSize: SIZES.body1,
      fontWeight: '400',
    },
    body2: {
      fontFamily: 'Poppins-Regular',
      fontSize: SIZES.body2,
      fontWeight: '400',
    },
    body3: {
      fontFamily: 'Poppins-Regular',
      fontSize: SIZES.body3,
      fontWeight: '400',
    },
  },
  liner_gradient: {
    firstColorScreen: [COLORS.purplish_pink, COLORS.purplish_blue],
  },
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  error_text: {
    color: COLORS.crimson,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  drawerContainer: {
    justifyContent: 'flex-end',
    height: SIZES.height,
    width: SIZES.width / 2,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: SIZES.width / 1.1,
    backgroundColor: COLORS.secondary,
    padding: 20,
    marginVertical: 20,
    borderRadius: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    width: SIZES.width,
    backgroundColor: COLORS.red,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 300,
    width: SIZES.width,
    paddingHorizontal: 20,
  },
  CARD: {
    flipCard: {
      width: 350,
      height: 300,
      padding: 10,
      backgroundColor: COLORS.secondary,
      borderRadius: 10,
      backfaceVisibility: 'hidden',
    },
    flipCardBack: {
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      backgroundColor: COLORS.secondary,
    },
  },
  PACK: {
    packContainer: {
      alignItems: 'center',
      width: SIZES.width / 2.3,
      margin: 10,
      padding: 10,
      backgroundColor: 'rgb(255, 222, 179)',
      borderBottomColor: COLORS.red,
      borderBottomWidth: 10,
      elevation: 5,
    },
    countContainer: {
      alignItems: 'center',
      width: 70,
      padding: 10,
      backgroundColor: COLORS.purple,
    },
  },
});
