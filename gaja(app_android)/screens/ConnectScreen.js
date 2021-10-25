import React, {useState, useEffect, useRef} from "react";
import { Image, SafeAreaView, Text, View, Animated } from "react-native";
import {database, ref} from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from "react-native";
import { auth } from "../firebase";

LogBox.ignoreAllLogs();
const dbRef = database.ref();
let driver;
let props;


dbRef.child('Clients').child(auth.currentUser?.email.split('@')[0]).get().then((snapshot) => {
  if(snapshot.exists()) {
    driver = snapshot.val();
  } else {
    console.log('No data available');
  }
}).catch((error) => {
  console.error(error);
});

const ConnectScreen = ({route}) => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeAniout] = useState(new Animated.Value(1));
  props = route.params.func;
  useEffect(() => {
    setTimeout(() => setLoading(true), 5000)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      props();
      navigation.navigate('MapScreen');
    }, 10000);
  }, []);


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAniout, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true
    }).start();
  }, []);




  ref.child('test/driver2.jpeg').getDownloadURL().then(function(url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    setImg(url);
  }).catch(function(error) {
    console.error(error);
  });

 
  
  return (
    <SafeAreaView style={{backgroundColor: 'white', width:'100%', height:'100%'}}>
      {loading ? 
      <View style={{backgroundColor: 'white'}}>
        <Image style={{width:'100%', height:300, resizeMode:'contain', top: 100}} source={{uri: img}} />
        <Text style={{fontSize:30, textAlign:'center', marginTop: 20, top: 100}}>차량번호 : {driver.carNum}</Text>
      </View> :
      <View style={{alignItems:'center'}}>
         <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
      <Text style={{fontSize: 80, top: 250}}>GAJA</Text>
    </Animated.View>
    <Animated.View style={{opacity: fadeAniout,}}>
      <Text style={{fontSize: 25, top: 270}}>Loading...</Text>
    </Animated.View>
      </View>
      }
    </SafeAreaView>
  );
}

export default ConnectScreen