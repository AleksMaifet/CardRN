import {View} from 'react-native';
import {SuperButton, SupperInput} from 'src/components/CoreComponents';
import {COLORS, styles} from 'src/assets/generalStyles';
import React, {memo} from 'react';
import {Formik} from 'formik';

const FORMIK_STATE_QUESTION = 'question';
const FORMIK_STATE_ANSWER = 'answer';

export const ModalScreenCard = memo(
  ({
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
          <View style={styles.modalContainer}>
            <SupperInput
              value={question}
              onChangeText={handleChange(FORMIK_STATE_QUESTION)}
              multiline
              numberOfLines={1}
              placeholder={placeholderText}
              borderColor={COLORS.red}
              selectionColor={COLORS.red}
            />
            <SupperInput
              value={answer}
              onChangeText={handleChange(FORMIK_STATE_ANSWER)}
              placeholder={primaryPlaceholderText}
              multiline
              numberOfLines={1}
              borderColor={COLORS.red}
              selectionColor={COLORS.red}
            />
            <View style={{alignItems: 'center'}}>
              <SuperButton
                callback={handleSubmit}
                width={100}
                text={buttonText}
                color={COLORS.red}
              />
            </View>
          </View>
        )}
      </Formik>
    );
  },
);
