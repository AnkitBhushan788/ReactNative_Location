
import React, { useState } from 'react';
import {StyleSheet, View, Text, Button, Image,TouchableOpacity} from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 0,
})

const App = () => {
  const [values, setValues] = useState({
    latitude: '',
    longitude:''

  });

  const getLocation = async () => {
    
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    });
  
    console.log("Line 65: ",permission)

    let location;
    if(!permission) {
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      })
      console.log("Line 81: ",permission)
      location = await RNLocation.getLatestLocation({timeout: 100})
      console.log(location)
      setValues({ ...values, latitude: location.latitude,longitude: location.longitude})
      
    } else {
      
      RNLocation.getLatestLocation({ timeout: 600 })
  .then(latestLocation => {
    console.log("Line 89: ",latestLocation)
    let ll=latestLocation.latitude+","+latestLocation.longitude;
    console.log("Line 89: ",ll)
    setValues({ ...values, latitude: latestLocation.latitude,longitude: latestLocation.longitude})
  })

    }
  }

 
  return (
    <View style={styles.MainContainer}>
       <View style={styles.cardView}>
      <Text  style={styles.textStyle}>React Native Location</Text>
      </View>
      <Text  style={styles.textView1}>You are here..!</Text>
      <Image 
        source={require('./imags/current_location.gif')}  
        style={{width: 150, height: 150, margin:50 }}/>
      <Text style={styles.textView1}>Latitude: {values.latitude} </Text>
      <Text style={styles.textView1}>Longitude: {values.longitude} </Text>
      <TouchableOpacity
        style={styles.bottomView} onPress={getLocation} >
          <Text style={styles.textStyle}>Get Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
 
    bottomView:{
 
      width: '100%', 
      height: 50, 
      backgroundColor: '#fa3754', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
 
    textStyle:{
 
      color: '#fff',
      fontSize:22
    },
    cardView:{
      width: '100%', 
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
      position:'absolute',
      top: 0,

      justifyContent:'space-around',
      padding:10,
      flexDirection: 'row',
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
      backgroundColor: '#fa3754',
      
      elevation:5
    },

    textView1:{
        alignSelf:'center',
        justifyContent:'flex-start',
      fontSize:20,
      color:'#000000'
    },
});

export default App;