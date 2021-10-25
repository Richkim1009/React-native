import { useNavigation } from '@react-navigation/core';
import React,{useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { auth } from '../firebase';

const LoginScreen = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        alert('로그인이 완료 되었습니다.');
        navigation.navigate("HomeScreen");
      }
    })
    return unsubscribe;
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View>
        <Image style={{width:200, height:200, resizeMode:'contain', left:'23%'}} source={require('./gaja.png')}></Image>
      </View>
      <TextInput 
      style={styles.input} 
      placeholder='e-mail을 입력해주세요' 
      autoCapitalize='none' 
      value={email} 
      onChangeText={text => setEmail(text)} 
      />
      <Text></Text>
      <TextInput 
      style={styles.input} 
      placeholder='비밀번호를 입력해주세요' 
      autoCapitalize='none' 
      value={password}
      secureTextEntry
      onChangeText={text => setPassword(text)} 
      />
      <Text></Text>
      <View style={styles.borderOutlineL}>
      <TouchableOpacity style={styles.buttonL} onPress={handleLogin}> 
        <Text style={styles.textL}>로그인</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  input : {
    marginLeft: '10%',
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    top: '5%'
  },

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