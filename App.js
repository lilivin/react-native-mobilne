import { Button, StyleSheet, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilmsScreen from './views/films';
import FilmScreen from './views/film';
import DirectorScreen from './views/director';
import HomeScreen from './views/home';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Witaj!'}}
        />
        <Stack.Screen
          name="Films"
          component={FilmsScreen}
          options={{title: 'Filmy'}}
        />
        <Stack.Screen
          name="Film"
          component={FilmScreen}
          options={{title: 'Film'}}
        />
        <Stack.Screen
          name="Director"
          component={DirectorScreen}
          options={{title: 'Reżyser'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
