import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/countdown';
import { RoundedButton } from '../../components/roundedButton';
import { colors } from '../../utils/colors';
import { paddingSizes } from '../../utils/sizes';
import { Timing } from './timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (time) => {
    setMinutes(time);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration, vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onEnd={onEnd}
          onProgress={onProgress}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>Focus on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonContainer}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: colors.white,
    textAlign: 'center',
  },

  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  timeContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },

  progressBar: {
    padding: paddingSizes.sm,
  },
});
