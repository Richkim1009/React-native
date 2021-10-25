import React, {useEffect,useState,useRef,useCallback} from 'react'
import { Image, StyleSheet,FlatList, Text, View,TouchableOpacity } from 'react-native';
import {database} from '../firebase';
import * as firebase from "firebase";
import { useNavigation } from '@react-navigation/core'
import { TextInput } from 'react-native-gesture-handler';

const ReviewList = () => {

    const [data, setData]=useState('');
    const navigation=useNavigation();
    const [passre, setPassre]=useState('');

    const inputChange = e=>{
      const{text} = e.nativeEvent;
      console.log(e.nativeEvent);
      setPassre(text);
   }



    function delreviewlist(key){
        database
        .ref('리뷰목록/'+ key)
        .set(null);
        alert('삭제되었습니다.')
      }

      useEffect(()=>{
        var changeDataRef = firebase.database().ref('리뷰목록').orderByChild("regdate")
        changeDataRef.on("value",(snapshot)=>{
          console.log(snapshot)
          const tmp=[];
          snapshot.forEach((child)=> {
            tmp.unshift({
              key:child.key,
              title:child.val().title,
              contents:child.val().contents,
              pass:child.val().pass,
              regdate:child.val().regdate
            })
          });
          setData(tmp);
        })
      },[])
      //source={{ uri:image ? image:null}}
      // 데이터 불러오기 펑션

      const renderItem = ({item}) => {
        
        return (
          <View>
            {/* <Image style={{ width:60,height:60}}/> */}
            <Text style={{ padding: 17 }}>
              {item.regdate} {item.title}
            </Text>
            <Text style={styles.review}>{item.contents}</Text>
            <View style={{ flexDirection: "row", marginLeft: 11 }}>
              <TextInput
                secureTextEntry
                placeholder={"pass"}
                onChangeText={text => {
                  setPassre(text);
                }}
                style={{
                  width: "15%",
                  borderWidth: 2,
                  borderRadius: 15,
                  height: "80%",
                  marginTop: "2.5%",
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  item.pass === passre
                    ? delreviewlist(item.key)
                    : !alert("비밀번호가다릅니다.")
                }
              >
                <Text style={styles.text}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setData();
                  navigation.navigate("ReviewScreen");
                }}
              >
                <Text style={styles.text}>수정</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }

    return (
        <View style={{marginTop:'20%'}}>
          <TouchableOpacity
               style={styles.button} 
               onPress={() => navigation.navigate("RewriteReviewScreen")}>
                <Text style={styles.text}>새글작성</Text>
              </TouchableOpacity>
            <FlatList data={data} renderItem={renderItem}/>
          </View>
    )
}

export default ReviewList

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        paddingVertical: 8,
        width:'15%',
        backgroundColor: 'black',
        borderRadius:10,
        marginTop:10,
        marginLeft:5,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      review:{
        padding:5,
        fontSize: 20,
        borderWidth:1,
        borderRadius:10,
        width:"90%",
        marginLeft:'4%',
      }
})