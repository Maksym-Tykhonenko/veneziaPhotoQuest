import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';

const Score = ({score, length}) => {
  return (
    <View
      style={{
        width: 100,
        backgroundColor: COLORS.BROWN,
        borderRadius: 20,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
        // marginHorizontal: 45,
      }}>
      <Text style={{fontFamily: 'VesperLibre-Medium', color: COLORS.GOLD}}>
        Score
      </Text>
      <Text style={{fontSize: 18, color: COLORS.YELLOW}}>
        {score}/{length}
      </Text>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({});
