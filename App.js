import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import TaskModalContextProvider from './contexts/TaskModalContext';

export default function App() {

  return (
    <TaskModalContextProvider>
      <Navigation/>
    </TaskModalContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
