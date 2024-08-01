import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLORS} from '../../constants/colors';
import {getAllQuestData} from '../../utils';
import {useEffect, useState} from 'react';

const AchievementList = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllQuestData();
      setData(data);
    };
    getData();
  }, []);

  const allAwards = data?.reduce((acc, item) => {
    if (item.isLocked === false) {
      const awards = item.award;
      console.log('award-', awards);
  
      return [...acc, awards];
    }
    return acc;
  }, []);
  const allAwardsWithoutLast = allAwards?.slice(0, -1);
  const award = allAwards?.length < 9 ? allAwardsWithoutLast : allAwards;

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      {allAwards?.length > 1 ? (
        <>
          <Text style={styles.header}>Yours Achievements</Text>
          <ScrollView style={{width: '70%'}}>
            <View style={{alignItems: 'center'}}>
              {award?.map((award, index) => (
                <Text style={styles.text} key={index}>
                  {award}
                </Text>
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};

export default AchievementList;

const styles = StyleSheet.create({
  header: {
    color: COLORS.GOLD,
    fontFamily: 'VesperLibre-Regular',
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    color: COLORS.GOLD,
    alignItems: 'center',
    fontFamily: 'VesperLibre-Bold',
    fontSize: 20,
    marginVertical: 5,
  },
});
