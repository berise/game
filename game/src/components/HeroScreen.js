import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Body from './Body';
import Info from './Info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default () => (
  <View style={styles.container}>
    <View style={{ width: 324 }}>
      <Body />
    </View>
    <View style={{ marginLeft: 20, width: 640 }}>
      <Info />
    </View>
  </View>
);
