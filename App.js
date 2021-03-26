
import React, {useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, Image,TouchableOpacity} from 'react-native';
import RNLocation from 'react-native-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

RNLocation.configure({
  distanceFilter: 0,
})

// var MapView = require('react-native-maps');
const App = () => {
  const [values, setValues] = useState({
    latitude: 28.579660,
    longitude:77.321110

  });
  useEffect(() => {
  
    getLocation()
  }, []);


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
      setValues({ ...values, latitude: parseFloat(location.latitude),longitude: parseFloat(location.longitude)})
      
    } else {
      
      RNLocation.getLatestLocation({ timeout: 600 })
  .then(latestLocation => {
    console.log("Line 89: ",latestLocation)
    let ll=latestLocation.latitude+","+latestLocation.longitude;
    console.log("Line 89: ",ll)
    setValues({ ...values, latitude: parseFloat(latestLocation.latitude),longitude: parseFloat(latestLocation.longitude)})
  })

    }
  }

 
  return (
    <View style={styles.MainContainer}>
       <View style={styles.cardView}>
      <Text  style={styles.textStyle}>React Native Location</Text>
      </View>
      <Text  style={styles.textView1}>Your current Location</Text>
      {/* <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  /> */}
  
  <View style={styles.mapCont}>
  <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
      
       region={{
         latitude: values.latitude,
         longitude: values.longitude,
         latitudeDelta: 0.005,
         longitudeDelta: 0.005,
         
       }}
     >
       <Marker  
            coordinate={{ latitude: values.latitude, longitude: values.longitude }}  
            title={"Your Location"}  
            description={"You are Here..!"}  
          />  
        {/* <Marker  
            coordinate={{ latitude:values.longitude,
              longitude: values.longitude, }}  
            title={"JavaTpoint"}  
            
            description={"Java Training Institute"}  
          />   */}
     </MapView>
     </View>
      {/* <Image 
        source={require('./imags/current_location.gif')}  
        style={{width: 150, height: 150, margin:50 }}/> */}
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
    backgroundColor: '#e3e3e3',
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
    mapCont: {
      elevation: 5,
      width: '90%', 
      height: '50%', 
      margin:20,
      borderColor:'#fa3754',
    },
    map: {
      width: '100%', 
      height: '100%', 
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
      
      elevation:15
    },

    textView1:{
        alignSelf:'center',
        justifyContent:'flex-start',
      fontSize:20,
      color:'#000000'
    },
});

export default App;