import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {GeneralStyles} from 'src/assets/generalStyles';
import {
  CheckBox,
  SuperButton,
  SupperInput,
} from 'src/components/CoreComponents';
import {EyeComponent} from 'src/components/SvgComponents';
import {
  ERROR_MESSAGES,
  FormContainer,
} from 'src/components/Screens/Main/Authorization/Form/index';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {LoginizationTC} from 'src/store/thunks';

const BUTTON_VALUE = 'Login';
const PLACEHOLDER_EMAIL = 'Email';
const PLACEHOLDER_PASSWORD = 'Password';
const FORMIK_STATE_MAIL = 'email';
const FORMIK_STATE_PASSWORD = 'password';
const FORMIK_STATE_REMEMBER_ME = 'rememberMe';
const CHECK_BOX_TITLE = 'Remember Me?';

const {width} = Dimensions.get('window');

export const FormIn = () => {
  const dispatch = useDispatch();

  const [isSecureText, setSecureText] = useState(true);

  const validate = values => {
    const errors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }
    if (!values.password) {
      errors.password = ERROR_MESSAGES.INVALID_PASSWORD.ERROR;
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{email: '', password: '', rememberMe: ''}}
      validate={validate}
      onSubmit={(values, actions) => {
        actions.resetForm();
        dispatch(LoginizationTC(values));
      }}
    >
      {({
        values: {email, password},
        handleChange,
        handleSubmit,
        errors,
        touched,
      }) => (
        <FormContainer>
          <View>
            <SupperInput
              value={email}
              onChangeText={handleChange(FORMIK_STATE_MAIL)}
              placeholder={PLACEHOLDER_EMAIL}
              borderColor={GeneralStyles.border_color}
              errorBorderColor={GeneralStyles.error_text.color}
              isError={!!touched.email && !!errors.email}
            />
            <Text style={GeneralStyles.error_text}>
              {touched.email && errors.email}
            </Text>
            <SupperInput
              value={password}
              onChangeText={handleChange(FORMIK_STATE_PASSWORD)}
              placeholder={PLACEHOLDER_PASSWORD}
              secureTextEntry={isSecureText}
              borderColor={GeneralStyles.border_color}
              errorBorderColor={GeneralStyles.error_text.color}
              isError={!!touched.password && !!errors.password}
              svg={<EyeComponent isSecureText={setSecureText} />}
            />
            <Text style={GeneralStyles.error_text}>
              {touched.password && errors.password}
            </Text>
          </View>
          <View style={[styles.checkboxContainer, {width: width - 50}]}>
            <View style={styles.checkbox}>
              <CheckBox
                onChange={handleChange(FORMIK_STATE_REMEMBER_ME)}
                borderColor={GeneralStyles.text_color}
                primary_borderColor={GeneralStyles.primary_color}
                backgroundColor={GeneralStyles.text_color_second}
              />
              <Text style={styles.label}>{CHECK_BOX_TITLE}</Text>
            </View>
          </View>
          <SuperButton
            text={BUTTON_VALUE}
            callback={handleSubmit}
            backgroundColor={GeneralStyles.primary_color}
            color={GeneralStyles.text_color_second}
          />
        </FormContainer>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'flex-end',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
});
