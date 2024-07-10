import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView } from 'react-native';
import useSWR from 'swr';
import {HOST, fetcher } from "../helpers/api";
import { Button, Card, Text } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';

export default function ActorsScreen({navigation}) {
    const { data: actors } = useSWR(`${HOST}/actor`, fetcher);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={210} name="person" style={styles.headerImage} />}>
        <Text style={{ color: "#FFF", fontWeight: 700 }} variant="headlineMedium">Aktorzy</Text>
        <Text style={{ color: "#FFF", marginBottom: 40 }} variant="bodyMedium">Wszyscy aktorzy! Śledź poczynania swoich ulubionych aktorów!</Text>
        <ScrollView
            horizontal={true}
            contentContainerStyle={{
                gap: 20
            }}
            >
            {
                actors?.map(actor => {
                    return (
                        <Card style={styles.card} key={actor.id}>
                            <Card.Cover source={{ uri: actor.image }} />
                            <Card.Title title={`${actor.name} ${actor.surname}`} subtitle={actor.shortDescription} />
                            <Card.Actions>
                                <Button
                                onPress={() =>
                                    navigation.navigate('Actor', {
                                        actorId: actor.id
                                    })
                                }
                                >Czytaj więcej</Button>
                            </Card.Actions>
                        </Card>
                    )
                })
            }
        </ScrollView>
        
        
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
