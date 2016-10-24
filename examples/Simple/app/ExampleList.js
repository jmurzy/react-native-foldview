import React from 'react';

import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import Row from './Row';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A637D',
    flex: 1,
    padding: 10,
  },
});

export default () => (
  <ScrollView
    style={styles.container}
  >
    <Row zIndex={100} />
    <Row zIndex={90} />
    <Row zIndex={80} />
    <Row zIndex={70} />
  </ScrollView>
);
