import {Text, TouchableOpacity, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = ({handleImage, style, children, btnStyle}) => {
  const responseHandler = response => {
    if (response.didCancel) {
      Alert.alert('Operation canceled');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const image = response.assets[0].uri;
      handleImage(image);
    } else {
      Alert.alert('No image selected');
    }
  };

  const library = () => {
    const options = {storageOptions: {path: 'images'}};
    launchImageLibrary(options, responseHandler);
  };

  return (
    <TouchableOpacity style={[btnStyle]} onPress={() => library()}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ImagePicker;
