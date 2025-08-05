// components/AddPetModal.tsx
import Colors from '@/constants/Colors';
import { PetFormData, petSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ModalDataType } from '@/types/index.types';
import { Camera, Globe, Images, Loader, Loader2 } from 'lucide-react-native';
import SpinningLoader from './SpinningLoader';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ModalDataType) => void;
};

export const AddModal = ({ open, onClose, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'You need to allow media access to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'You need to allow camera access to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const FetchImageFromAPI = async () => {
    try{
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await response.json();
      setImage(data.message);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch image from API');
    }
    finally{
      setLoading(false);
    }
  }

  const handleFormSubmit = (data: PetFormData) => {
    if(!image) {
      Alert.alert('Image required', 'Please select or take a photo of your pet.');
    }
    onSubmit({...data, image });
    onClose();
  };

  return (
    <Modal visible={open} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Add Pet</Text>
            
             {/* Image Preview */}
            {
              loading ? (
                <View style={styles.imageGenerating}>
                  <SpinningLoader size={32} color={'black'} />
                  <Text style={{fontSize: 10}} > Generating </Text>
                </View>
              ) : 
              
                image ? (
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                  <View style={styles.imageButtons}>
                    <View style={styles.imageIconButton}>
                      <Images onPress={pickImage} />
                    </View>
                    <View style={styles.imageIconButton}>
                      <Camera onPress={takePhoto}  />
                    </View>
                    <View style={styles.imageIconButton}>
                      <Globe onPress={FetchImageFromAPI}  />
                    </View>
                  </View>
                )
              }
              <TextInput
                placeholder="Pet Name"
                onChangeText={text => setValue('petName', text)}
                style={styles.input}
                />
              {errors.petName && <Text style={styles.error}>{errors.petName.message}</Text>}

              <TextInput
                placeholder="Breed"
                onChangeText={text => setValue('breed', text)}
                style={styles.input}
                />
              {errors.breed && <Text style={styles.error}>{errors.breed.message}</Text>}

              <TextInput
                placeholder="Age (in months)"
                keyboardType="numeric"
                onChangeText={text => setValue('age', text)}
                style={styles.input}
                />
              {errors.age && <Text style={styles.error}>{errors.age.message}</Text>}
            <View style={styles.buttonRow}>
              <Button title="Cancel"  onPress={onClose} />
              <Button title="Submit" onPress={handleSubmit(handleFormSubmit)} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 10,
    paddingHorizontal: 30
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 2,
    paddingVertical: 6,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,

  },
  buttonRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageGenerating: {
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    width: '50%',
    alignSelf: 'center',
    gap: 8
  },
  imageIconButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  }
});
