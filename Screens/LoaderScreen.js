import {StyleSheet, Text, View, ImageBackground, Animated} from 'react-native';
import {useEffect, useRef} from 'react';
import {COLORS} from '../constants/colors';

const LoaderScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => navigation.replace('MainScreen'));
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('../assets/bgquest.jpeg')}
      style={{flex: 1}}>
      <Animated.View style={[{opacity: fadeAnim}, styles.textContainer]}>
        <Text style={styles.mainText}>Welcome </Text>
        <Text style={styles.middleText}>To The</Text>
        <Text style={styles.mainText}>Venezia Photo Quest</Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  mainText: {
    color: COLORS.GOLD,
    fontSize: 62,
    marginVertical: 20,
    textAlign: 'center',
    fontFamily: 'VesperLibre-Medium',
  },
  middleText: {
    color: COLORS.GOLD,
    fontSize: 32,
    fontFamily: 'VesperLibre-Medium',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'VesperLibre-Medium',
  },
});
