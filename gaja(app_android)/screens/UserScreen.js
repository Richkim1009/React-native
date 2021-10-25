import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/core"; 
import tw from 'tailwind-react-native-classnames';
import {auth} from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { database } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const UserScreen = () => {
  const navigation = useNavigation();
  let str = auth.currentUser?.email.split('@');

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("HomeScreen");
      })
      .catch(error => alert(error.message));
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}> 
      <TouchableOpacity style={tw`bg-gray-900 absolute top-16 left-4 p-3 mt-2 
            rounded-full shadow-lg z-50`}
          onPress={() => {navigation.navigate('HomeScreen')}}    
        >
        <AntDesign name="home" size={20} color="white" />
      </TouchableOpacity>
     
      <View style={{padding: 5, left:'33%'}}>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain'
          }}
          source={require('../screens/gaja.png')}
      />
      </View>
      <View>
        <TouchableOpacity style={{top:'60%', left:'6%'}} onPress={() => {navigation.navigate('InfoScreen')}}>
          <FontAwesome name="photo" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{left:'18%', top:'10%'}}>{str[0]}님 로그인이 되었습니다.</Text>
      </View>
      <View style={tw`border-t border-gray-200 flex-shrink mt-5`}/>
      <View style={styles.borderOutlineL}>
        <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}} style={styles.buttonL}>
          <Text style={styles.textL}>구독하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderOutlineR}>
        <TouchableOpacity onPress={() => {navigation.navigate('ReviewList')}} style={styles.buttonR}>
          <Text style={styles.textR}>내가 쓴 리뷰 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderOutlineL}>
        <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}} style={styles.buttonL}>
          <Text style={styles.textL}>개인 정보 변경</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderOutlineR}>
        <TouchableOpacity onPress={handleLogout} style={styles.buttonR}>
          <Text style={styles.textR}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  buttonL:{
      backgroundColor:'black',
      width:'100%',
      padding:10,
      borderRadius:10,
      alignItems: 'center'
  },
  buttonR: {
    backgroundColor:'white',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  borderOutlineL: {
    backgroundColor:'white',
    width: '80%',
    borderColor:'black',
    marginTop: 5,
    marginLeft: '10%',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: '10%'
  },
  borderOutlineR: {
    backgroundColor:'white',
    width: '80%',
    borderColor:'black',
    marginTop: '10%',
    marginLeft: '10%',
    borderWidth: 2,
    borderRadius: 15
  },
  textL: {
    color:'white',
    fontWeight: '700'
  },
  textR: {
    color:'black',
    fontWeight: '700'
  }
  
  })