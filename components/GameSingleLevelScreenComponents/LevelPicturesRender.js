import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/colors';

const LevelPicturesRender = ({levelData, choosenPicture}) => {
  function renderPictureHandle({item}) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => choosenPicture(item)}>
        <Image
          source={{uri: item.image}}
          style={[
            styles.image,
            {
              borderWidth: item.isCorrect ? 6 : 3,
              borderColor: item.isCorrect ? COLORS.GOLD : COLORS.GREY,
            },
          ]}
        />
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={levelData}
      keyExtractor={item => item.optionId}
      renderItem={renderPictureHandle}
    />
  );
};

export default LevelPicturesRender;

const styles = StyleSheet.create({
  image: {height: 150, width: 150, marginVertical: 10, borderRadius: 12},
});
