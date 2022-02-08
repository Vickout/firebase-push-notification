import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import App from './App';

const FCMContext = React.createContext();

const FCMProvider = () => {
  const [backMessage, setBackMessage] = useState({});
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      setBackMessage(remoteMessage);
    });
  }, []);

  return (
    <FCMContext.Provider value={backMessage}>
      <App />
    </FCMContext.Provider>
  );
};

export {FCMProvider, FCMContext};
