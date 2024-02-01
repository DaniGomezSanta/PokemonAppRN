import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon, Result } from '../interfaces/pokemoninterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width

interface Props {
  pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

  const navigation = useNavigation();

  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    //IOS background
    //android: dominant
    const fetchColors = async () => {
      const result = await ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      if (!isMounted.current) return;
      if (result.platform === 'android') {
        setBgColor(result.dominant || 'grey')
      } else if (result.platform === 'ios') {
        setBgColor(result.background || 'grey')
      }
    }
    fetchColors()
    return () => {
      isMounted.current = false;
    }
  }, [])


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={
        () => navigation.navigate('PokemonScreen',
          {
            simplePokemon: pokemon,
            color: bgColor
          })
      }
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgColor
      }}>

        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokemonImage}
        />

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
    // overflow: 'hidden' //Esto hace que lo que se sale de la card no se muestre ene ste caso la bola
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5
  }

})

