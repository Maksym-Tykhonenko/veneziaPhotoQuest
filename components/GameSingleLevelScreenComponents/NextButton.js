import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {CustomButton} from '../ui';

const NextButton = ({onPressFn, quest}) => {
  const AWARD = quest?.award;

  return (
    <View
      style={styles.nextBtnContainer}
      onPress={onPressFn}
      activeOpacity={0.7}>
      <Text style={styles.nextBtnText}>Level Passed</Text>
      {AWARD.length > 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={styles.nextBtnText}>YOU WON</Text>
          <Text style={styles.awardText}>{AWARD}</Text>
        </View>
      ) : (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Text style={{textAlign: 'center', color: COLORS.GOLD, fontSize: 34}}>
            You passed first level
          </Text>
        </View>
      )}
      <CustomButton
        onPressFn={onPressFn}
        styleText={styles.nextBtnText}
        styleContainer={styles.subBtnContainer}>
        To All Quests 
      </CustomButton>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  nextBtnContainer: {
    position: 'absolute',
    top: '40%',
    zIndex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.BLACK,
    borderWidth: 3,
    padding: 10,
    borderRadius: 19,
    marginHorizontal: 40,
    borderColor: COLORS.GOLD,
    width: '80%',
    height: 300,
  },
  nextBtnText: {
    fontSize: 18,
    color: COLORS.GOLD,
    textAlign: 'center',
    fontFamily: 'VesperLibre-Regular',
    marginHorizontal: 15,
  },
  subBtnContainer: {
    borderColor: COLORS.GOLD,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
  },
  awardText: {
    color: COLORS.GOLD,
    fontFamily: 'VesperLibre-Regular',
    fontSize: 34,
    marginTop: 20,
    textAlign: 'center',
  },
});
