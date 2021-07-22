import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/focus';
import { FocusHistory } from './src/features/focus/focusHistory';
import { colors } from './src/utils/colors';
import { paddingSizes } from './src/utils/sizes';
import { Timer } from './src/features/timer/timer';
import AsyncStorage from '@react-native-async-storage/async-storage'
// You can import from local files

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2,
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1),subject, status}])
  }

  const onClear = () => {
    setFocusHistory([]);
  }

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  },[]) 

  useEffect(() => {
    saveFocusHistory();
  },[focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE );
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELED );
            setFocusSubject(null);
          }}></Timer>
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.md : paddingSizes.lg,
    backgroundColor: colors.darkBlue,
  },
});
