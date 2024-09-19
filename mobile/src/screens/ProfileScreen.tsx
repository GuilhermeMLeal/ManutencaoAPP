import React from 'react';
import { View, Text } from 'react-native';
import { HeaderCustom } from '../components/HeaderCustom';

export function ProfileScreen({ navigation }: { navigation: any }) {
    return (
    <View>
        <HeaderCustom navigation={navigation} />
      <Text>Profile Screen</Text>
    </View>
  );
}
