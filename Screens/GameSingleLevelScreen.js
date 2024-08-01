import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import useQuestData from '../hooks/useQuestData';
import {
  GoBack,
  LevelOptionsRender,
  LevelPicturesRender,
  NextButton,
  Score,
} from '../components/GameSingleLevelScreenComponents';
import {useCallback, useEffect, useState} from 'react';
import {
  updateQuestData,
  getAllQuestData,
  unlockNextQuestLevel,
  resetQuestLevel,
} from '../utils';
import {useOptionsData} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import WonModal from '../components/ui/WonModal';
import {COLORS} from '../constants/colors';
import {CustomButton} from '../components/ui';

const GameSingleLevelScreen = ({route}) => {
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState(0);
  const [levelData, setLevelData] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [questPainter, setQuestPainter] = useState('');
  const [levelOptions, setLevelOptions] = useState([]);
  const [quest, setQuest] = useState();

  const levelId = route.params.levelId;
  const navigation = useNavigation();

  const {questData, loading, error, setQuestData} = useQuestData();
  const {optionsData} = useOptionsData();

  const nextBtnHandler = () => {
    navigation.navigate('GameLevelsScreen', {refresh: true});
  };

  const reloadQuestData = useCallback(async () => {
    const data = await getAllQuestData();
    setQuestData(data);
  }, [setQuestData]);

  const checkAnswerValidation = picture => {
    const choosenPictureTitle = picture.title;
    const choosenPictureId = picture.optionId;
    if (currentTitle === choosenPictureTitle) {

      updateQuestData(levelId, choosenPictureId).then(() => {
        reloadQuestData();
      });
    }
  };

  const handleLevelReset = async () => {
    resetQuestLevel(levelId).then(() => {
      reloadQuestData();
    });
  };

  function getLevelData(questData, optionData, levelId) {

    const quest = questData?.find(object => object.questId === levelId);

    if (!quest) {
      return {
        levelData: [],
        questPainter: '',
        levelOptions: [],
      };
    }
    const levelData = quest.quest_questions || [];
    const questPainter = quest.painter || '';
    const levelOptions =
      optionData.find(option => option.painter === questPainter) || [];

    return {levelData, questPainter, levelOptions, quest};
  }

  useEffect(() => {
    const {levelData, questPainter, levelOptions, quest} = getLevelData(
      questData,
      optionsData,
      levelId,
    );
    
    setLevelData(levelData);
    setQuestPainter(questPainter);
    setLevelOptions(levelOptions);
    setQuest(quest);

    const questIndex = questData.findIndex(elem => elem.questId === levelId);
    if (score === 10) {
      unlockNextQuestLevel(questIndex, levelId);
      // Alert.alert('Attention', 'Congratulations you won');
    }
  }, [score, questData, optionsData, levelId]);

  useEffect(() => {
    if (!loading && !error && questData.length > 0) {
      const currentLevel = questData.find(object => object.questId === levelId);
      if (currentLevel) {
        const currentScore = currentLevel.quest_questions.filter(
          question => question.isCorrect,
        ).length;
        setScore(currentScore);
      }
    }
  }, [questData, loading, error, levelId]);

  if (loading) {
    return <Text>Data loading...</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  function handleChooseOption(value) {
    setCurrentTitle(value.option);
  }


  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../assets/bgquest.jpeg')}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.scoreContainer}>
          <GoBack>Go Back</GoBack>
          <Score length={levelData.length} score={score} />
          <CustomButton
            onPressFn={handleLevelReset}
            styleContainer={{
              justifyContent: 'flex-start',
              borderWidth: 1,
              borderColor: COLORS.GOLD,
              // borderRadius: 12,
              marginVertical: 15,
            }}
            styleText={{
              color: COLORS.GOLD,
              fontSize: 20,
              padding: 6,
              fontFamily: 'VesperLibre-Medium',
            }}>
            Reset
          </CustomButton>
        </View>
        <View style={styles.rootContainer}>
          <View>
            <LevelOptionsRender
              currentTitle={currentTitle}
              levelData={levelData}
              optionData={levelOptions}
              choosenOption={handleChooseOption}
            />
          </View>
          <View>
            <LevelPicturesRender
              levelData={levelData}
              choosenPicture={checkAnswerValidation}
           
            />
          </View>
        </View>
        <Modal
          style={{height: 200}}
          animationType="slide"
          visible={modal}
    
        >
          <WonModal />
        </Modal>
      </SafeAreaView>
      {score === levelData.length ? (
        <NextButton onPressFn={nextBtnHandler} quest={quest} />
      ) : null}
    </ImageBackground>
  );
};

export default GameSingleLevelScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 30,
    justifyContent: 'center',
    marginTop: 60,
  },
  scoreContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
    justifyContent: 'space-evenly',
  },
  safeArea: {
    flex: 1,
  },
});
