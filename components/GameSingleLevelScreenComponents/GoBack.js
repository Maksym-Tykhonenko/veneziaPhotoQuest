import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/colors';

const GoBack = ({children}) => {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={pressHandler} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    // borderRadius: 12,
    marginVertical: 15,
  },
  text: {
    color: COLORS.GOLD,
    fontSize: 20,
    padding: 6,
    fontFamily: 'VesperLibre-Medium',
  },
});
