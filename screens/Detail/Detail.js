import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import axios from 'axios';

const Detail = ({route}) => {
  let api_key = "j6IZsZfJ5ohmjGv3VHUkEqcFxFq4bbhHsGYzp3vd";

  const {cod} = route.params;
  const [photos, setPhotos] = useState([]);

  useEffect(async () => {
    const items = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${cod}&api_key=${api_key}`,
    );
    setPhotos(items.data?.photos || []);
  }, [cod, api_key]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.container_image}>
        <Image
          style={styles.image}
          source={{
            uri: item.img_src,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_image: {
    backgroundColor: '#000',
    marginBottom: 5,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 350,
  },
});

export default Detail;
