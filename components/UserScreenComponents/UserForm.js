import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import PreviewImage from '../ui/PreviewImage';
import {CustomButton, ImagePicker, InputCustom} from '../ui';
import {COLORS} from '../../constants/colors';

const UserForm = ({onSubmit}) => {
  const [imagePreview, setImagePreview] = useState();
  const [input, setInput] = useState({
    nickName: '',
    image: '',
    // date: '',
  });

  function inputsHandler(ident, newValue) {
    setInput(thisValue => {
      return {...thisValue, [ident]: newValue};
    });
  }
  function resetInputs() {
    setInput({nickName: '', image: ''});
  }

  function imageHandler(i) {
    setImagePreview(i);
    inputsHandler('image', i);
  }
  function submitHandler() {
    const userFormData = {
      name: input.nickName,
      image: input.image,
      // date: input.date,
      id: Math.random(),
    };
    const nameIsValid = userFormData.name.trim().length > 0;
    // const dataIsValid = userFormData.date.toString() !== 'Invalid Date';
    if (!nameIsValid) {
      Alert.alert('Wrong Inputs', 'Check your name columns');
      return;
    }
    onSubmit(userFormData);
  }

  return (
    <View>
      <ScrollView>
        <View style={{justifyContent: 'center', marginTop: 40}}>
          <View style={{flexDirection: 'row'}}>
            <InputCustom
              label="Name"
              textStyle={{
                color: COLORS.GOLD,
                fontSize: 24,
                textAlign: 'center',
              }}
              inputConfig={{
                placeholder: 'user name',
                keyboardType: 'ascii-capable',
                value: input.nickName,
                onChangeText: inputsHandler.bind(this, 'nickName'),
              }}
            />
            {/* <InputCustom
              label="Birth Date"
              textStyle={{color: COLORS.GOLD, fontSize: 24}}
              inputConfig={{
                placeholder: 'YYYY-MM-DD',
                keyboardType: 'default',
                maxLength: 10,
                value: input.date,
                onChangeText: inputsHandler.bind(this, 'date'),
              }}
            /> */}
          </View>
          <View style={{alignItems: 'center'}}>
            <ImagePicker
              handleImage={i => imageHandler(i)}
              style={{fontSize: 24, color: COLORS.GOLD}}
              btnStyle={styles.imagePicker}>
              Add Photo
            </ImagePicker>
          </View>
          {imagePreview && <PreviewImage image={imagePreview} />}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              justifyContent: 'space-around',
            }}>
            <CustomButton
              styleContainer={styles.btn}
              styleText={styles.btnText}
              onPressFn={resetInputs}>
              Reset
            </CustomButton>
            <CustomButton
              styleContainer={styles.btn}
              styleText={styles.btnText}
              onPressFn={submitHandler}>
              Save
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  imagePicker: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    borderColor: COLORS.GOLD,
    marginVertical: 10,
  },
  btn: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    borderColor: COLORS.GOLD,
    marginVertical: 10,
  },
  btnText: {color: COLORS.GOLD, fontSize: 24},
});
