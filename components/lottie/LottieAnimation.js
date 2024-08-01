import {StyleSheet, View} from 'react-native';
import Animation from 'lottie-react-native';

const LottieAnimation = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <Animation
       
        source={require('../../assets/animations/AnimationQuest.json')}
        // source={require('../../assets/animations/AnimationOk.json')}
        style={{width: 200, height: 200, borderRadius: 19}}
        autoPlay
        loops
        speed={0.7}
      />
    </View>
  );
};

export default LottieAnimation;

const styles = StyleSheet.create({});
