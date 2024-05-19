import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView } from 'react-native';
import useSWR from 'swr';
import {HOST, fetcher } from "../helpers/api";
import { Button, Card, Text } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';
export default function FilmsScreen({navigation}) {
    const { data: films, error, isLoading, mutate } = useSWR(`${HOST}/film`, fetcher);
    const { data: categories } = useSWR(`${HOST}/category`, fetcher);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="videocam-outline" style={styles.headerImage} />}>
        <Text style={{ color: "#FFF", fontWeight: 700 }} variant="headlineMedium">Filmy</Text>
        <Text style={{ color: "#FFF" }} variant="bodyMedium">Wszystkie Twoje ulubione filmy! Masz ochotę na konkretną kategorie? Wybierz już teraz z tysięcy dostępnych filmów w naszym serwisie!</Text>
        
        {categories?.map((category, index) => {
          const categoryFilms = films?.filter(film => film.category.id === category.id);
          if(!categoryFilms?.length) return;
          return (
              <View key={index} style={styles.cards}>
                <Text style={{ color: "#FFF", marginBottom: 15 }} variant="headlineSmall">{category.name}</Text>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        gap: 20
                    }}
                    >
                    {
                        categoryFilms?.map(film => {
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
              </View>
          )
        })}
        
        
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
