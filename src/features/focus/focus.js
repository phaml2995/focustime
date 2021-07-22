import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';
import {fontSizes, paddingSizes} from '../../utils/sizes';
import { RoundedButton } from '../../components/roundedButton';

export const Focus = ({ addSubject }) => {
  const [tmpItem, setTmpItem] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, margin: paddingSizes.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setTmpItem(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => addSubject(tmpItem)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },

  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
