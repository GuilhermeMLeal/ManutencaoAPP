import React from 'react';
import { View, Text } from 'react-native';
import { HeaderCustom } from '../components/HeaderCustom';

export function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bem-vindo à Home!</Text>
      </View>
    </View>
  );
}
