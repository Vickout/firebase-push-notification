/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import NativeUploady from "@rpldy/native-uploady";
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { FCMContext } from './fcmContext';
import { Upload } from './src/components/Upload';

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [dataFromBack, setDataFromBack] = useState({
    text: '',
  });
  const messageFromback = useContext(FCMContext);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    messaging()
      .getToken('my-token')
      .then(token => console.log(token));
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'A new FCM message arrived by onMessage!',
        JSON.stringify(remoteMessage),
      );
      setDataFromBack(remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  return (
    <NativeUploady>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            {dataFromBack.text || messageFromback.text ? (
              <Section title="Step One">
                <Text style={styles.highlight}>
                  {dataFromBack.text || messageFromback.text}
                </Text>
              </Section>
            ) : (
              <Section title="Step One">
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Section>
            )}
            <Section>
              <Upload />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeUploady>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
