import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/colors';

const RenderLevelsGrid = ({header, onPressFn, isDisabled, isLocked}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPressFn}
      disabled={isDisabled}>
      <Text
        style={[
          styles.text,
          {color: isLocked ? COLORS.GOLD + 50 : COLORS.GOLD},
        ]}>
        {header}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderLevelsGrid;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    marginVertical: 4,
    alignItems: 'center',
    borderColor: COLORS.GOLD,
    // borderRadius: 8,
    marginVertical: 10,
    backgroundColor: COLORS.BLACK + 90,
  },
  text: {
    fontSize: 32,
    color: COLORS.GOLD,
    fontFamily: 'VesperLibre-Medium',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
