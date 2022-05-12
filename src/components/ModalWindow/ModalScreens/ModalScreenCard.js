import {StyleSheet, View} from 'react-native';
import {SuperButton, SupperInput} from 'src/components/CoreComponents';
import {GeneralStyles} from 'src/assets/generalStyles';
import React, {memo} from 'react';
import {Formik} from 'formik';

const FORMIK_STATE_QUESTION = 'question';
const FORMIK_STATE_ANSWER = 'answer';

export const ModalScreenCard = memo(
  ({
    currentTitle,
    showModal,
    callback,
    placeholderText,
    primaryPlaceholderText,
    buttonText,
  }) => {
    return (
      <Formik
        initialValues={{question: '', answer: ''}}
        onSubmit={(values, actions) => {
          actions.resetForm();
          showModal();
          callback(values);
        }}
      >
        {({values: {question, answer}, handleChange, handleSubmit}) => (
          <>
            <SupperInput
              value={question}
              onChangeText={handleChange(FORMIK_STATE_QUESTION)}
              multiline
              numberOfLines={2}
              placeholder={placeholderText}
              borderColor={GeneralStyles.primary_color_second}
              selectionColor={GeneralStyles.primary_color_second}
            />
            <SupperInput
              value={answer}
              onChangeText={handleChange(FORMIK_STATE_ANSWER)}
              placeholder={primaryPlaceholderText}
              multiline
              numberOfLines={2}
              borderColor={GeneralStyles.primary_color_second}
              selectionColor={GeneralStyles.primary_color_second}
            />
            <View style={styles.buttonContainer}>
              <SuperButton
                callback={handleSubmit}
                width={100}
                text={buttonText}
                color={GeneralStyles.primary_color_second}
              />
            </View>
          </>
        )}
      </Formik>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: GeneralStyles.text_color,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
