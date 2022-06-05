import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Formik} from 'formik';
import {COLORS} from 'src/assets/generalStyles';
import {SuperButton, SupperInput} from 'src/components/CoreComponents';
import {EyeComponent} from 'src/components/SvgComponents';
import {FormContainer} from 'src/components/Screens/Main/Authorization/index';
import {useDispatch} from 'react-redux';
import {ERROR_MESSAGES} from 'src/components/Screens/Main/Authorization/Form/errorMessages';
import {AuthorizationTC} from 'src/store/thunks';

const BUTTON_VALUE = 'Register';
const PLACEHOLDER_EMAIL = 'Email';
const PLACEHOLDER_PASSWORD = 'Password';
const PLACEHOLDER_CONFIRM_PASSWORD = 'Confirm password';
const FORMIK_STATE_MAIL = 'email';
const FORMIK_STATE_PASSWORD = 'password';
const FORMIK_STATE_CONFIRM_PASSWORD = 'passwordConfirm';
const MIN_PASSWORD_LENGTH = 8;

export const FormUp = ({scrollView}) => {
  const dispatch = useDispatch();

  const [isSecureText, setSecureText] = useState(true);
  const [isSecureConfirmText, setSecureConfirmText] = useState(true);

  const validate = values => {
    const errors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }
    if (!values.password) {
      errors.password = ERROR_MESSAGES.INVALID_PASSWORD.ERROR;
    }
    if (values.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = ERROR_MESSAGES.INVALID_PASSWORD.CHARACTERS;
    }
    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = ERROR_MESSAGES.INVALID_PASSWORD.CONFIRM;
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{email: '', password: '', passwordConfirm: ''}}
      validate={validate}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        const {email, password} = values;
        dispatch(AuthorizationTC({email, password}, scrollView));
        actions.resetForm();
      }}
    >
      {({
        values: {email, password, passwordConfirm},
        handleChange,
        handleSubmit,
        errors,
        touched,
        handleBlur,
      }) => (
        <FormContainer>
          <View>
            <SupperInput
              value={email}
              onChangeText={handleChange(FORMIK_STATE_MAIL)}
              placeholder={PLACEHOLDER_EMAIL}
              borderColor={COLORS.gray}
              errorBorderColor={COLORS.crimson}
              isError={!!touched.email && !!errors.email}
              onBlur={handleBlur(FORMIK_STATE_MAIL)}
            />
            <Text style={COLORS.crimson}>{touched.email && errors.email}</Text>
            <SupperInput
              value={password}
              onChangeText={handleChange(FORMIK_STATE_PASSWORD)}
              placeholder={PLACEHOLDER_PASSWORD}
              secureTextEntry={isSecureText}
              borderColor={COLORS.gray}
              errorBorderColor={COLORS.crimson}
              isError={!!touched.password && !!errors.password}
              onBlur={handleBlur(FORMIK_STATE_PASSWORD)}
              svg={<EyeComponent isSecureText={setSecureText} />}
            />
            <Text style={COLORS.crimson}>
              {touched.password && errors.password}
            </Text>
            <SupperInput
              value={passwordConfirm}
              onChangeText={handleChange(FORMIK_STATE_CONFIRM_PASSWORD)}
              placeholder={PLACEHOLDER_CONFIRM_PASSWORD}
              secureTextEntry={isSecureConfirmText}
              borderColor={COLORS.gray}
              errorBorderColor={COLORS.crimson}
              isError={!!touched.passwordConfirm && !!errors.passwordConfirm}
              onBlur={handleBlur(FORMIK_STATE_CONFIRM_PASSWORD)}
              svg={<EyeComponent isSecureText={setSecureConfirmText} />}
            />
            <Text style={COLORS.crimson}>
              {touched.passwordConfirm && errors.passwordConfirm}
            </Text>
          </View>
          <SuperButton
            text={BUTTON_VALUE}
            callback={handleSubmit}
            backgroundColor={COLORS.primary}
            color={COLORS.secondary}
          />
        </FormContainer>
      )}
    </Formik>
  );
};
