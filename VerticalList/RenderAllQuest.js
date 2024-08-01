import {Text, FlatList, SafeAreaView} from 'react-native';
import {useCallback, useState} from 'react';
import {RenderLevelsGrid} from '../components/GameLevelsScreenComponents';
import {getAllQuestData} from '../utils';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const RenderAllQuest = () => {
  const navigation = useNavigation();
  const [questData, setQuestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getAllQuestData();
          setQuestData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []),
  );

  if (loading) {
    return <Text>Data loading...</Text>;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (questData.length === 0) {
    return <Text>No Data Available</Text>;
  }

  function renderAuthorLevel(itemData) {
    function handleNavigation() {
      navigation.navigate('GameSingleLevelScreen', {
        levelId: itemData.item.questId,
      });
    }
    return (
      <RenderLevelsGrid
        isLocked={itemData.item.isLocked}
        isDisabled={itemData.item.isLocked}
        header={itemData.item.painter}
        onPressFn={handleNavigation}
      />
    );
  }

  return (

      <FlatList
        data={questData}
        keyExtractor={item => item.questId}
        renderItem={renderAuthorLevel}
      />

  );
};

export default RenderAllQuest;
