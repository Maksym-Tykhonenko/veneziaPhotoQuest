import {StyleSheet, ImageBackground, SafeAreaView, View} from 'react-native';
import {useEffect, useState} from 'react';
import {
  getAllQuestData,
  getOptionsData,
  setOptionsData,
  setQuestDataFn,
} from '../utils';
import {RenderAllQuest} from '../VerticalList';
import {PAINTINGS} from '../data';
import {OPTIONS} from '../data/titles';
import {GoBack} from '../components/GameSingleLevelScreenComponents';
import {DataLoading} from '../components/ui';

const GameLevelsScreen = ({route}) => {
  const [isDataInitialized, setIsDataInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const [questData, optionsData] = await Promise.all([
          getAllQuestData(),
          getOptionsData(),
        ]);
        if (questData.length === 0) {
          await setQuestDataFn(PAINTINGS);
        }
        if (optionsData.length === 0) {
          await setOptionsData(OPTIONS);
        }
        setIsDataInitialized(true);
      } catch (error) {
        console.error('Error initializing data', error);
        setIsDataInitialized(false);
      }
    };
    initializeData();
  }, []);

  if (!isDataInitialized) {
    return <DataLoading />;
  }

  return (
    <ImageBackground
      source={require('../assets/bgquest.jpeg')}
      style={{flex: 1, padding: 20}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <GoBack>To Main </GoBack>
        </View>
        <RenderAllQuest route={route} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GameLevelsScreen;

const styles = StyleSheet.create({});
