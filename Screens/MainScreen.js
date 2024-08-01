import {StyleSheet, ImageBackground, SafeAreaView, View} from 'react-native';
import {CustomButton, UserIcon} from '../components/ui';
import {COLORS} from '../constants/colors';

const MainScreen = ({navigation}) => {
  function handleToRulesScreen() {
    navigation.navigate('RulesScreen');
  }
  function handleToGameScreen() {
    navigation.navigate('GameLevelsScreen');
  }
  const renderVerticalText = text => {
    return text.split('').map((char, index) => (
      <Text key={index} style={styles.btnText}>
        {char}
      </Text>
    ));
  };
  return (
    <ImageBackground
      source={require('../assets/bgquest.jpeg')}
      style={{flex: 1}}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.profileIcon}>
          <UserIcon />
        </View>
        <View>
          <CustomButton
            styleContainer={styles.btnContainer}
            onPressFn={handleToGameScreen}
            styleText={styles.btnText}>
            GAME
          </CustomButton>
          <CustomButton
            styleContainer={styles.btnContainer}
            onPressFn={handleToRulesScreen}
            styleText={styles.btnText}>
            RULES
          </CustomButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  btnContainer: {
    borderColor: COLORS.GOLD,
    borderWidth: 2,
    padding: 10,
    width: 200,
    alignItems: 'center',
    marginVertical: 25,
    backgroundColor: COLORS.BLACK + 90,
  },
  btnText: {
    color: COLORS.GOLD,
    fontFamily: 'VesperLibre-Regular',
    fontSize: 44,
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileIcon: {
    height: 220,
    marginTop: 20,
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 60,
  },
});
