import {StyleSheet, Text, ImageBackground} from 'react-native';
import {COLORS} from '../../constants/colors';

const DataLoading = () => {
  return (
    <ImageBackground
      source={require('../../assets/bgquest.jpeg')}
      style={styles.container}>
      <Text style={styles.text}>Loading data...</Text>
    </ImageBackground>
  );
};

export default DataLoading;

const styles = StyleSheet.create({
  text: {
    color: COLORS.GOLD,
    fontFamily: 'VesperLiber-Regular',
    fontSize: 24,
  },
  container: {},
});
