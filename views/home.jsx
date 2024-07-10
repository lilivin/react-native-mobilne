import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';
export default function HomeScreen({navigation}) {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Text style={{fontSize: 144, fontWeight: 700, lineHeight: 110, display: "flex", textAlign: "center", alignItems: "center", height: "100%"}}>Film Wiki</Text>}>
        <Card>
            <Card.Cover source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reactnative-bc00d.appspot.com/o/into-film-plus-catalogue-image-07-22.jpg?alt=media&token=f16f3653-6e7b-4a16-b886-b7b4663c387b' }} />
            <Card.Title title="Filmy" subtitle="Oglądaj filmy ze swoich ulubionych kategorii!" />
            <Card.Actions>
                <Button 
                    onPress={() =>
                        navigation.navigate('Films')
                    }
                >Zobacz</Button>
            </Card.Actions>
        </Card>

        <Card style={{marginTop: 50}}>
            <Card.Cover source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reactnative-bc00d.appspot.com/o/directors_rt_group_a_l.webp?alt=media&token=42e712c3-99e0-434f-bebe-4fda29b6f24a' }} />
            <Card.Title title="Reżyserzy" subtitle="Zobacz filmy stworzone przez Twoim ulubionych reżyserów!" />
            <Card.Actions>
                <Button 
                    onPress={() =>
                        navigation.navigate('Directors')
                    }
                >Zobacz</Button>
            </Card.Actions>
        </Card>

        <Card style={{marginTop: 50}}>
            <Card.Cover source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reactnative-bc00d.appspot.com/o/most-popular-Chinese-actors.jpg?alt=media&token=081c232a-23d7-43e4-af8c-b3bd4bb1ecc4' }} />
            <Card.Title title="Aktorzy" subtitle="Zobacz aktorów występujących w filmach!" />
            <Card.Actions>
                <Button 
                    onPress={() =>
                        navigation.navigate('Actors')
                    }
                >Zobacz</Button>
            </Card.Actions>
        </Card>
    
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
