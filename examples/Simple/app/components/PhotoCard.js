import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  ThinGrayLine,
  ThickWhiteLine,
} from './Lines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33373B',
    padding: 10,
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
});

export default ({ onPress }) => (
  <View style={styles.container}>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#5A4A9C',
        height: 40,
        padding: 10,
      }}
    >
      <ThickWhiteLine width={40} onPress={onPress} />
      <ThickWhiteLine width={60} />
      <ThickWhiteLine width={40} />
    </View>

    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          paddingBottom: 0,
        }}
      >
        <ThinGrayLine width={40} />
        <ThinGrayLine width={80} />
        <ThinGrayLine width={50} onPress={onPress} />
      </View>
    </View>

  </View>
);
