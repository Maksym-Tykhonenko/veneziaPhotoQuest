import {StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/colors';

const LevelOptionsRender = ({
  optionData,
  levelData,
  choosenOption,
  currentTitle,
  onReset,
}) => {
  function optionsRenderHandle({item}) {
    const option = item.option;
    const isThisPictureGuess = levelData.find(item => item.title === option);
    return (
      <TouchableOpacity
        onPress={() => choosenOption(item)}
        activeOpacity={0.6}
        style={[
          styles.rootContainer,
          {
            borderColor: isThisPictureGuess?.isCorrect
              ? COLORS.GOLD
              : currentTitle === option
              ? COLORS.GREEN
              : COLORS.GREY,
            // borderColor: isThisPictureGuess?.isCorrect
            //   ? COLORS.GOLD
            //   : COLORS.GREY,
            borderWidth: isThisPictureGuess?.isCorrect ? 6 : 3,
            backgroundColor: isThisPictureGuess?.isCorrect
              ? COLORS.GOLD + 20
              : null,
          },
        ]}>
        <Text style={styles.text}>{option}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={optionData?.options}
      key={item => item.optionId}
      renderItem={optionsRenderHandle}
    />
  );
};

export default LevelOptionsRender;

const styles = StyleSheet.create({
  rootContainer: {
    width: 150,
    borderWidth: 3,
    marginVertical: 10,
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
  },
  text: {
    padding: 2,
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
    color: COLORS.GOLD,
    fontFamily: 'VesperLibre-Medium',
  },
});
