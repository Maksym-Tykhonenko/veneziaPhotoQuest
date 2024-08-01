import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Text,
} from 'react-native';
import {GoBack} from '../components/GameSingleLevelScreenComponents';
import {COLORS} from '../constants/colors';

const RulesScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/bgquest.jpeg')}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <GoBack>Return</GoBack>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={[styles.textColor, styles.headerMainText]}>
            VENEZIA QUEST
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.textColor, styles.subHeader]}>
              Game Description
            </Text>
            <Text
              style={[
                styles.textColor,
                styles.textPosition,
                styles.descriptionText,
              ]}>
              Welcome to Venezia Quest, your personal guide to the world of
              Venetian art! This app is designed for those who want to expand
              their knowledge of masterpieces by famous Venetian artists and
              their unforgettable works.
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.textColor, styles.subHeader]}>
              Game Objective
            </Text>
            <Text
              style={[
                styles.textColor,
                styles.textPosition,
                styles.descriptionText,
              ]}>
              Your task is to match the titles of paintings with their
              corresponding images. This game will help you learn the names of
              famous paintings and remember their authors, expanding your art
              knowledge.
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.textColor, styles.subHeader]}>
              Learn Through Play
            </Text>
            <Text
              style={[
                styles.textColor,
                styles.textPosition,
                styles.descriptionText,
              ]}>
              Venezia Quest is not only a fun game but also a powerful
              educational tool. Learn more about art, expand your horizons, and
              enjoy the learning process!
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.textColor, styles.subHeader]}>
              How to Play
            </Text>
            <Text
              style={[
                styles.textColor,
                styles.textPosition,
                styles.descriptionText,
              ]}>
              1. Select a Painting: The screen will display 10 paintings in
              random order.
            </Text>
            <Text
              style={[
                styles.textColor,
                styles.textPosition,
                styles.descriptionText,
              ]}>
              2. Match: Select the title of the painting to match it with the
              corresponding image.
            </Text>
            <Text
              style={[
                styles.textColor,
                styles.textPosition,
                styles.descriptionText,
              ]}>
              3. Confirm: After you have matched all the paintings with their
              titles, click the "Next" button to proceed to all quest levels.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RulesScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  textColor: {
    color: COLORS.GOLD,
    marginVertical: 10,
  },
  headerMainText: {
    fontFamily: 'VesperLibre-Bold',
    fontSize: 42,
  },
  subHeader: {
    fontFamily: 'VesperLibre-Bold',
    fontSize: 34,
  },
  textPosition: {
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 18,
  },
});
