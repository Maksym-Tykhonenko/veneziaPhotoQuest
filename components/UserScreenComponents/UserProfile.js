import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {CustomButton, ImagePicker} from '../ui';
import {COLORS} from '../../constants/colors';

const UserProfile = ({data, onUpdatePhoto, onUpdateName}) => {
  const [nameUpdate, setNameUpdate] = useState();
  const [newName, setNewName] = useState(data.name);

  async function handleImage(i) {
    onUpdatePhoto(i);
  }
  async function handleName(n) {
    onUpdateName(newName);
    setNameUpdate(false);
  }
  return (
    <View style={styles.container}>
      <View>
        {nameUpdate ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 14,
              gap: 30,
              marginBottom: 20,
            }}>
            <TextInput
              style={styles.inputName}
              value={newName}
              onChangeText={setNewName}
            />
            <CustomButton
              onPressFn={handleName}
              styleText={{
                color: COLORS.BEIGE,
                fontSize: 30,
              }}
              styleContainer={{
                alignItems: 'center',
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.GOLD,
                borderRadius: 12,
              }}>
              Save
            </CustomButton>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setNameUpdate(true)}>
            <Text style={styles.name}>{newName}</Text>
          </TouchableOpacity>
        )}
        <ImagePicker handleImage={i => handleImage(i)}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageProfile} source={{uri: data.image}} />
          </View>
        </ImagePicker>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 58,
    fontWeight: 'bold',
    padding: 10,
  },

  name: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
    color: COLORS.GOLD,
    marginBottom: 10,
    fontFamily: 'VesperLibre-Medium',
  },
  country: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  imageContainer: {
    borderRadius: 60,
    width: 250,
    height: 300,
    borderWidth: 4,
    overflow: 'hidden',
    borderColor: COLORS.GOLD,
  },
  imageProfile: {
    height: '100%',
    width: '100%',
  },
  inputName: {
    height: 40,
    flex: 1,
    fontSize: 18,
    color: COLORS.BLACK,
    backgroundColor: COLORS.BEIGE,
    padding: 6,
    borderRadius: 6,
    fontFamily: 'VesperLibre-Medium',
  },
});
