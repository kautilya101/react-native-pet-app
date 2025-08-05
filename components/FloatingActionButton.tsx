import React from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors';
import { Plus } from 'lucide-react-native';

export const FloatingActionButton = ({onPress} : {onPress: () => void}) => {
  return (
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={onPress}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    elevation: 5,
    bottom: 20,
    right:20,
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    padding: 10,
  }
});