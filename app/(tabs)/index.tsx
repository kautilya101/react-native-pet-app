import { FlatList, StyleSheet, ToastAndroid } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useState } from 'react';
import { AddModal } from '@/components/AddModal';
import { ModalDataType } from '@/types/index.types';
import { usePetContext } from '@/context/petContext';
import { PetListItem } from '@/components/PetListItem';
import SpinningLoader from '@/components/SpinningLoader';


export default function TabOneScreen() {
  const  [modalOpen, setmodalOpen] = useState(false);
  const { dispatch, state: data } = usePetContext();
  
  const handleSubmit= async (data: ModalDataType) => {
    dispatch({ type: 'SET_IMAGE', payload: data.image ||'' });
    dispatch({ type: 'SET_FORM', payload: { petName: data.petName, breed: data.breed, age: data.age } });
    try {
      const res = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: data.petName,
          breed: data.breed,
          age: data.age,
          image: data.image,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (!res.ok) {
        console.log('Failed to submit', res.statusText);
        // add on prod throw new Error('Failed to submit');
      }
      dispatch({ type: 'SAVE_SUBMISSION' });
      ToastAndroid.show('Pet added successfully!', ToastAndroid.SHORT);
      setmodalOpen(false);
    } catch (e) {
      console.log('Error submitting form', e);
      dispatch({ type: 'SUBMIT_ERROR', payload: (e as Error).message });
      return;
    }
  }

  return (
    <View style={styles.container}>
      { 
        data.submissions.length > 0 ? 
        data.loading ?
        <SpinningLoader size={23} color={'black'} />
        : <FlatList style={styles.listCard} data={data.submissions} renderItem={(item) => <PetListItem data={item}/>} />
       : <Text style={{fontSize: 16, fontWeight: 'bold', color: '#9b9b9bff'}}>No Pet Found</Text> 
      }
      {
        modalOpen && 
        <AddModal 
          open={modalOpen} 
          onClose={() => setmodalOpen(false)} 
          onSubmit={handleSubmit}
        />
      }
      <FloatingActionButton onPress={() => setmodalOpen(prev => !prev) } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  listCard: {
    width: '100%',
  },
});
