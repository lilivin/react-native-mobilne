import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import useSWR from 'swr';
import {HOST, fetcher } from "../helpers/api";
import { Button, Card, Text, Avatar, IconButton, TextInput } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { useState } from 'react';
export default function FilmScreen({navigation, route}) {
    const { filmId } = route.params;
    const [text, setText] = useState("");
    const [userName, setUserName] = useState("");
    const { data: film, error, isLoading, mutate } = useSWR(`${HOST}/film/${filmId}`, fetcher);
    const { data: actors, error: actorsError, isLoading: actorsLoading, } = useSWR(`${HOST}/film/${filmId}/actors`, fetcher);
    const { data: reviews, error: reviewsError, isLoading: reviewsLoading, mutate: reviewMutate } = useSWR(`${HOST}/film/${filmId}/reviews`, fetcher);

    const handleReviewSubmit = async () => {
      try {
        const response = await fetch(`${HOST}/film/${filmId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            filmId: `${filmId}`,
            user: userName
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        await reviewMutate();
        setText("");
        setUserName("");
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image
        style={{height: '100%'}}
        source={film?.image} 
      />}>
        <Text style={{ color: "#FFF", marginBottom: 20 }}>
          Kategoria:
        <Button style={{ textDecoration: "underline" }} textColor='#FFF' mode='text'>{film?.category?.name}</Button>
        </Text>
        <Text style={{ color: "#FFF", fontWeight: 700 }} variant="headlineLarge">{film?.title}</Text>
        <Text style={{ color: "#FFF", fontWeight: 500 }} variant="bodyMedium">{film?.subtitle}</Text>

        
        <Text style={{ color: "#FFF", fontWeight: 700, marginTop: 30 }} variant="headlineSmall">O filmie</Text>
        <Text style={{ color: "#FFF", fontWeight: 500 }} variant="bodyMedium">{film?.content}</Text>
        
        <Text style={{ color: "#FFF", fontWeight: 700, marginTop: 30, marginBottom: 10 }} variant="headlineSmall">Aktorzy</Text>

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

        
        <Text style={{ color: "#FFF", fontWeight: 700, marginTop: 30, marginBottom: 10 }} variant="headlineSmall">Reżyser</Text>

        <Card.Title
          style={{gap: 20, paddingLeft: 0}}
          titleStyle={{color: "#FFF"}}
          subtitleStyle={{color: "#FFF"}}
          title={`${film?.director?.name} ${film?.director?.surname}`}
          subtitle={film?.director?.shortDescription}
          left={(props) => <Avatar.Image size={60} source={film?.director?.image}  />}
        />
        <Button 
          onPress={() =>
            navigation.navigate('Director', {
              directorId: film?.director?.id
            })
          } 
          style={{backgroundColor: "#FFF", marginTop: 10 }} 
          textColor="#000"  
          icon="information-outline" 
          mode="contained" 
        >
          O reżyserze
        </Button>

        

        <Text style={{ color: "#FFF", fontWeight: 700, marginTop: 30, marginBottom: 10 }} variant="headlineSmall">Komentarze</Text>

        <TextInput
          style={{ borderRadius: 5, marginBottom: 10, marginTop: 10}}
          label="Nick"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          style={{ borderRadius: 5, marginBottom: 10, marginTop: 10}}
          label="Komentarz"
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button style={{marginBottom: 20}} mode="contained" onPress={handleReviewSubmit}>
          Wyślij
        </Button>

        {
          
            reviews?.map(review => {
                return (
                  <Card.Title
                    style={{gap: 20, paddingLeft: 0}}
                    titleStyle={{color: "#FFF", fontWeight: 700}}
                    subtitleStyle={{color: "#FFF"}}
                    title={`${review?.user}`}
                    subtitle={review?.text}
                  />
                )
            })
        }

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
