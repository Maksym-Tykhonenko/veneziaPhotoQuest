import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const UserIcon = () => {
  const navigation = useNavigation();
  function navigateHandler() {
    navigation.navigate('UserScreen');
  }
  return (
    <TouchableOpacity
      onPress={navigateHandler}
      style={{alignItems: 'flex-end', marginVertical: 10}}
      activeOpacity={0.6}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.head}></View>
          <View style={styles.body}></View>
          <Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserIcon;

const styles = StyleSheet.create({
  mainContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  head: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: COLORS.GOLD,
  },
  body: {
    width: 40,
    height: 15,
    backgroundColor: COLORS.GOLD,
    marginTop: 4,
    borderRadius: 10,
  },
});
