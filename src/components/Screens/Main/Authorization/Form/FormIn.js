import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {COLORS, SIZES} from 'src/assets/generalStyles';
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
      initialValues={{email: '', password: '', rememberMe: false}}
      validate={validate}
      onSubmit={values => {
        dispatch(LoginizationTC(values));
      }}
    >
      {({
        values: {email, password, rememberMe},
        handleChange,
        setFieldValue,
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
              borderColor={COLORS.gray}
              errorBorderColor={COLORS.crimson}
              isError={!!touched.email && !!errors.email}
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
              svg={<EyeComponent isSecureText={setSecureText} />}
            />
            <Text style={COLORS.crimson}>
              {touched.password && errors.password}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', width: SIZES.width - 50}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={rememberMe}
                onChange={value =>
                  setFieldValue(FORMIK_STATE_REMEMBER_ME, value)
                }
                checkColor={COLORS.secondary}
                backgroundColor={COLORS.primary}
              />
            </View>
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
