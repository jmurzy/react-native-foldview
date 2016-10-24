import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  ThinGrayLine,
  ThickDarkGrayLine,
} from './Lines';

export default ({ onPress }) => (
  <View
    style={{
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',

      backgroundColor: '#FFFFFF',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#BDC2C9',
    }}
  >
    <View style={{ flex: 1 }}>
      <ThickDarkGrayLine width={100} />
      <ThinGrayLine width={80} onPress={onPress} />
    </View>

    <View style={{ flex: 1 }}>
      <ThickDarkGrayLine width={60} />
      <ThinGrayLine width={120} />
    </View>

  </View>
);
