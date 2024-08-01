import {ImageBackground, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoBack} from '../components/GameSingleLevelScreenComponents';
import {AchievementList, UserProfile} from '../components/UserScreenComponents';
import UserForm from '../components/UserScreenComponents/UserForm';
import {DataLoading} from '../components/ui';

const UserScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState();
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await AsyncStorage.getItem('user');
        const userData = user ? JSON.parse(user) : null;

        if (userData && userData.id) {
          // console.log('Data from asyncstorage', userData);
          setProfileData(userData);
          setIsProfile(true);
        } else {
          console.log('no data found');
        }
      } catch (error) {
        console.log('error fetching', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (isLoading) {
    return <DataLoading />;
  }
  const handleSubmitUserForm = async userFormData => {
    console.log('handleSubmitUserForm-', userFormData);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userFormData));
      setProfileData(userFormData);
      setIsProfile(true);
    } catch (error) {
      console.log('Data was not saved', error);
    }
  };
  
  async function handleUpdateProfilePhoto(photo) {
    console.log('Profile Screen update photo fn', photo);
    try {
      const user = await AsyncStorage.getItem('user');
      const userData = user ? JSON.parse(user) : {};
      userData.image = photo;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setProfileData(userData);
    } catch (error) {
      console.log('Failed to update user image', error);
    }
  }
  async function handleUpdateProfileName(name) {
    console.log('profile screen', name);

    try {
      const user = await AsyncStorage.getItem('user');
      const userData = user ? JSON.parse(user) : {};
      userData.name = name;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setProfileData(userData);
    } catch (error) {
      console.log('Failed to update user name', error);
    }
  }

  return (
    <ImageBackground
      source={require('../assets/bgquest.jpeg')}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <GoBack>Main Menu</GoBack>
        </View>
        {/* <LottieAnimation /> */}
        {isProfile ? (
          <>
            <UserProfile
              data={profileData}
              onUpdatePhoto={handleUpdateProfilePhoto}
              onUpdateName={handleUpdateProfileName}
            />
            <AchievementList />
          </>
        ) : (
          <UserForm onSubmit={handleSubmitUserForm} />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default UserScreen;
