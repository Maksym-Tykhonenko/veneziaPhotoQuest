import {StyleSheet, Text, View, TextInput} from 'react-native';
import {COLORS} from '../../constants/colors';

const InputCustom = ({containerStyle, textStyle, label, inputConfig}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
      <TextInput style={styles.textInput} {...inputConfig} autoFocus />
    </View>
  );
};

export default InputCustom;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  textInput: {
    height: 35,
    flex: 1,
    fontSize: 18,
    color: COLORS.BLACK,
    backgroundColor: COLORS.GREY,
    padding: 6,
    borderRadius: 6,
  },
});
