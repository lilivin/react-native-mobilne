import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import useSWR from 'swr';
import {HOST, fetcher } from "../helpers/api";
import { Button, Card, Text, Avatar, IconButton } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';
export default function DirectorScreen({navigation, route}) {
    const { directorId } = route.params;
    const { data: director } = useSWR(`${HOST}/director/${directorId}`, fetcher);
    const { data: films } = useSWR(`${HOST}/director/${directorId}/films`, fetcher);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image
        style={{height: '100%'}}
        source={director?.image} 
      />}>
        <Text style={{ color: "#FFF", fontWeight: 700 }} variant="headlineLarge">{director?.name} {director?.surname}</Text>
        <Text style={{ color: "#FFF", fontWeight: 500 }} variant="bodyMedium">{director?.shortDescription}</Text>

        
        <Text style={{ color: "#FFF", fontWeight: 700, marginTop: 30 }} variant="headlineSmall">O reżyserze</Text>
        <Text style={{ color: "#FFF", fontWeight: 500 }} variant="bodyMedium">{director?.description}</Text>
        
        <Text style={{ color: "#FFF", fontWeight: 700, marginTop: 30, marginBottom: 10 }} variant="headlineSmall">Filmy</Text>
        <ScrollView
            horizontal={true}
            contentContainerStyle={{
                gap: 20
            }}
        >
        {
            films?.map(film => {
                return (
                    <Card style={styles.card} key={film.id}>
                        <Card.Cover source={{ uri: film.image }} />
                        <Card.Title title={film.title} subtitle={film.subtitle} />
                        <Card.Actions>
                            <Button
                            onPress={() =>
                                navigation.navigate('Film', {
                                filmId: film.id
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
