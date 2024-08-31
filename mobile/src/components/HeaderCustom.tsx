import React from 'react';
import {
    StyleSheet,
    View,
    Linking,
} from 'react-native';
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const HeaderCustom = () => {
    
    return (
        <SafeAreaProvider>
            <HeaderRNE
                leftComponent={{
                    icon: 'menu',
                    color: 'black',
                    size: 40,
                    
                    
                }}
                rightComponent={
                    <View style={styles.headerRight}>
                        <Icon
                name="settings"
                type="material"
                color="black"
                size={40}
                style={styles.icon}
            />
                       <Icon
                name="account-circle"
                type="material"
                color="black"
                size={40}
            />
                    </View>
                }
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    icon: {
        marginLeft: 20,
    },
});

export default HeaderCustom;