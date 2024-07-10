import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function UserScreen({navigation, route}) {
    const [text, setText] = useState("");
    // const { data: film, error, isLoading, mutate } = useSWR(`${HOST}/film/${filmId}`, fetcher);

    function handleLogin(){
        auth()
          .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
          });
    }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={210} name="person" style={styles.headerImage} />}>
        <Button onPress={handleLogin}>Login</Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cards: {
    marginTop: 20
  },
  card: {
    width: "60vw",
  }
});
