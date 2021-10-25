import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/core"; 
import tw from 'tailwind-react-native-classnames';

const AccountScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={tw`bg-white h-full`}> 
      <View>
        <Image style={{width:200, height:200, resizeMode:'contain', left:'23%'}} source={require('./gaja.png')}></Image>
        </View>
      <View style={styles.borderOutlineL}>
        <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}} style={styles.buttonL}>
          <Text style={styles.textL}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderOutlineR}>
        <TouchableOpacity onPress={() => {navigation.navigate('CreateScreen')}} style={styles.buttonR}>
          <Text style={styles.textR}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AccountScreen

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
  width: '60%',
  borderColor:'black',
  marginTop: 5,
  marginLeft: '20%',
  borderWidth: 2,
  borderRadius: 15,
  marginTop: '20%'
},
borderOutlineR: {
  backgroundColor:'white',
  width: '60%',
  borderColor:'black',
  marginTop: 5,
  marginLeft: '20%',
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