import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilmsScreen from './views/films';
import FilmScreen from './views/film';
import DirectorScreen from './views/director';
import HomeScreen from './views/home';
import DirectorsScreen from './views/directors';
import ActorsScreen from './views/actors';
import ActorScreen from './views/actor';
import UserScreen from './views/user';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Witaj!',
            headerRight: () => (
              <TouchableOpacity style={{paddingRight: 20}} onPress={() => navigation.navigate('Users')}>
                <Text>Konto</Text>   
              </TouchableOpacity>
            ),
          })}
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
        <Stack.Screen
          name="Directors"
          component={DirectorsScreen}
          options={{title: 'Reżyserzy'}}
        />
        <Stack.Screen
          name="Actor"
          component={ActorScreen}
          options={{title: 'Aktor'}}
        />
        <Stack.Screen
          name="Actors"
          component={ActorsScreen}
          options={{title: 'Aktorzy'}}
        />
        <Stack.Screen
          name="Users"
          component={UserScreen}
          options={{title: 'Konto'}}
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
