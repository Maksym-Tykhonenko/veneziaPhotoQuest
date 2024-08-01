import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';

const paintingsData = [
  {
    id: 1,
    title: 'Fall of the Giants',
    image: {
      uri: 'https://uploads3.wikiart.org/images/pietro-longhi/fall-of-the-giants.jpg!Large.jpg',
    },
  },
  {
    id: 2,
    title: 'The Concert',
    image: {uri: 'https://www.wga.hu/art/l/longhi/pietro/1/01concer.jpg'},
  },
  // Додаткові дані для інших картин...
];

const names = [{text: 'The Concert'}, {text: 'Fall of the Giants'}];

const test = () => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedPictureTitle, setSelectedPictureTitle] = useState('');
  const [score, setScore] = useState(0);

  const handleTitleSelect = title => {
    setSelectedTitle(title);
  };

  const handleImageSelect = painting => {
    // Перевіряємо, чи обране зображення відповідає обраній назві картини
    if (painting.title === selectedTitle) {
      setScore(score + 1);
    }
  };
  return (
    <SafeAreaView style={{height: 500}}>
      <View style={styles.container}>
        {/* Ліва колонка з текстом назв картин */}
        <View style={styles.leftColumn}>
          <FlatList
            data={paintingsData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleTitleSelect(item.title)}>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Права колонка з зображеннями картин */}
        <View style={styles.rightColumn}>
          {paintingsData.map(painting => (
            <TouchableOpacity
              key={painting.id}
              onPress={() => handleImageSelect(painting)}>
              <Image
                source={painting.image}
                style={[
                  styles.image,
                  {opacity: selectedTitle === painting.title ? 0.5 : 1},
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Відображення балів */}
        <Text style={styles.score}>Score: {score}</Text>
      </View>
    </SafeAreaView>
  );
};

export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Розташування у дві колонки
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftColumn: {
    borderWidth: 1,
    flex: 1,
    padding: 20,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin: 5,
  },
  score: {
    position: 'absolute',
    bottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
