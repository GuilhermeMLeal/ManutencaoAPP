import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.backButton} onPress={onPress}>
    <View style={styles.buttonContent}>
      <Icon name="arrow-left" type="font-awesome" color="black" size={28} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
});

export default BackButton;
