import { StyleSheet } from 'react-native';

const maintenanceStyle = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20, 
    right: 20,  
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText:{
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'

  }
});



export default maintenanceStyles;
