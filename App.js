import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExerciseList from './ExerciseList';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{paddingTop:30, textAlign:"center", fontSize:28}}>ענבר המושלמת</Text>
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
