import {StyleSheet, Text, View, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {NextButton} from '../GameSingleLevelScreenComponents';

const WonModal = ({score}) => {
  
  return (
    <View style={{height: 300, justifyContent: 'center', flexDirection: 'row'}}>
      <Text>WonModal</Text>
      <NextButton />
    </View>
  );
};

export default WonModal;

const styles = StyleSheet.create({});
