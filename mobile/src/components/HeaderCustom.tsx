import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';

interface HeaderCustomProps {
  navigation: any;
}

export function HeaderCustom({ navigation }: HeaderCustomProps) {
  return (
    <Header
      leftComponent={
        <View style={styles.navWrapper}>
          <Icon 
            name="list" 
            type="font-awesome" 
            color="white" 
            onPress={() => navigation.navigate('MachineList')} 
          />
        </View>
      }
      centerComponent={{ text: 'MyApp', style: { color: '#fff', fontSize: 20 } }}
      rightComponent={
        <Icon 
          name="user" 
          type="font-awesome" 
          color="white" 
          onPress={() => navigation.navigate('Profile')} 
        />
      }
      containerStyle={styles.headerContainer}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#3D6DCC',
    justifyContent: 'space-around',
    borderBottomWidth: 0,
  },
  navWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});
