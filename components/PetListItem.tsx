import { PetData } from '@/context/petContext';
import React from 'react';
import { StyleSheet, View, Text, Image, ListRenderItemInfo } from 'react-native';

export const PetListItem = ({ data }: { data: ListRenderItemInfo<PetData> }) => {
  const { petName, breed, age, image } = data.item;

  return (
    <View style={styles.card}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.petName}>{petName}</Text>
          {age ? <Text style={styles.age}>{age} months</Text> : null}
        </View>
        <Text style={styles.breed}>{breed}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  petName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  age: {
    fontSize: 14,
    color: '#777',
  },
  breed: {
    fontSize: 16,
    color: '#555',
  },
});
