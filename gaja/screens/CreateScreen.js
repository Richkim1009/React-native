import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { auth, database } from '../firebase';
import { CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core';



const CreateScreen = () => {
  const [pass, setPass] = useState();
  const [passCh, setPassCh] = useState();
  const [passFlag, setPassFlag] = useState();
  const [textEmail, setTextEmail] = useState('');
  const [reg, setReg] = useState(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [msg] = useState('비밀번호가 일치하지 않습니다.');
  const [flag, setFlag] = useState(false);
  const [firstFlag, setFirstFlag] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [carNum, setCarNum] = useState('');
  const navigation = useNavigation();
  

  const test = (userId, disabled, mail, carNum) => {
    database
      .ref( 'Clients/' + userId)
      .set({
        disabled : disabled ? 'disabled' : 'noneDisabled',
        email : mail,
        carNum : carNum,
      });
  }


  useEffect(() => {
    setFlag(reg.test(textEmail));
  }, [textEmail])

  useEffect(() => {
    pass !== passCh ? setPassFlag(true) : setPassFlag(false);
  }, [pass, passCh])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        let str = auth.currentUser?.email.split('@');
        test(str[0], checked, auth.currentUser.email, carNum);
        alert(str[0] + '님 가입을 축하드립니다.');
        navigation.navigate('HomeScreen');
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View>
        <Image style={{width:200, height:200, resizeMode:'contain', left:'23%'}} source={require('./gaja.png')}></Image>
      </View>
      <View style={styles.view}>
        <TextInput style={styles.input} placeholder='e-mail을 입력해주세요' autoCapitalize='none' onChangeText={(text) => {
          setTextEmail(text); setFirstFlag(true); setEmail(text);
        }}></TextInput>
      </View>
      <View style={styles.view}>
        <Text style={tw`pl-10 font-thin text-xs text-red-700 h-4 mt-4`}>{!flag && firstFlag && '올바른 형식이 아닙니다.'}</Text>
      </View>
      <View style={styles.view}>
        <TextInput style={styles.input} placeholder='비밀번호를 입력해주세요' secureTextEntry autoCapitalize='none' onChangeText={(text) => {
          setPass(text); setPassword(text);
        }}></TextInput>
      </View>
      <View style={styles.view}>
        <TextInput style={styles.input} placeholder='비밀번호 확인' secureTextEntry autoCapitalize='none' onChangeText={(text) => {
          setPassCh(text);
        }}></TextInput>
      </View>
      <View style={styles.view}>
        <Text style={tw`pl-10 font-thin text-xs text-red-700 h-4 mt-4`}>{passFlag && msg}</Text>
      </View>
      <View style={styles.view}>
        <TextInput style={styles.input} placeholder='차량번호를 입력해주세요' autoCapitalize='none' onChangeText={(text) => {
          setCarNum(text);
        }}></TextInput>
      </View>
      <View style={{ left: 40, top: 50, width: 300}}>
        <CheckBox
          center
          checkedColor='black'
          size={24}
          title='장애인이시라면 체크를 해주세요'
          checked={checked}
          onPress={() => {setChecked(!checked)}}
        />
      </View>
      <View style={styles.borderOutlineR}>
        <TouchableOpacity style={styles.buttonR} onPress={handleSignUp}>
          <Text style={styles.textR}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CreateScreen

const styles = StyleSheet.create({
  view: {
    top: '5%'
  },
  input : {
    marginLeft: '10%',
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    top: '20%'
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
  marginTop: '50%'
},
borderOutlineR: {
  backgroundColor:'white',
  width: '60%',
  borderColor:'black',
  marginTop: '20%',
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
},

checkbox: {
  alignSelf: "center",
}
})