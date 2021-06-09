import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { I18nManager } from 'react-native';
import ExerciseList from './ExerciseList';

try {
  I18nManager.allowRTL(false);
}
catch (e) {
  console.log(e);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ paddingTop: 30, textAlign: "center", fontSize: 28 }}>ענבר המושלמת</Text>
      <ExerciseList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
