import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  ThinGrayLine,
  ThickGrayLine,
  ThickDarkGrayLine,
  ThinRedLine,
} from './Lines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  leftPane: {
    flex: 1,
    backgroundColor: '#33373B',
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightPane: {
    flex: 2,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default ({ onPress }) => (
  <View style={styles.container}>

    <View style={styles.leftPane}>
      <ThickGrayLine />

      <View>
        <ThinRedLine onPress={onPress} />
        <ThickGrayLine width={80} />
      </View>
    </View>

    <View style={styles.rightPane}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ThickGrayLine width={140} />
        <ThickGrayLine width={160} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <ThinGrayLine width={60} />
          <ThickDarkGrayLine width={60} />
        </View>

        <View style={{ flex: 1 }}>
          <ThinGrayLine width={60} />
          <ThickDarkGrayLine width={60} />
        </View>
      </View>
    </View>

  </View>
);
