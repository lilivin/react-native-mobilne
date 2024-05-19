import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import useSWR from 'swr';
import {HOST, fetcher } from "../helpers/api";
import { Button, Card, Text, Avatar, IconButton } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';
export default function FilmScreen({navigation, route}) {
    const { filmId } = route.params;
    const { data: film, error, isLoading, mutate } = useSWR(`${HOST}/film/${filmId}`, fetcher);
    console.log(film)

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
