import {Text, TouchableOpacity} from 'react-native';

const CustomButton = ({children, styleContainer, styleText, onPressFn}) => {
  return (
    <TouchableOpacity
      onPress={onPressFn}
      activeOpacity={0.7}
      style={[styleContainer]}>
      <Text style={[styleText]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
