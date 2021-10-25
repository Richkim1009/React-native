import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Button,
  View,
  Modal,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { database } from "../firebase";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase";
import * as firebase from "firebase";

export default function review() {
  const [title, setTitle] = useState("");
  const [pass, setPass] = useState("");
  const [contents, setContents] = useState("");
  const [id,setId] = useState(auth.currentuser.email.split('@'));
  const [rating, setRating]=useState("");
  // 데이터 불러오기
  const [data, setData] = useState("");
  const navigation = useNavigation();

  function reviewlist() {
    //  var key=auth.currentUser.email;
    var key = Math.random().toString().replace(".", "");
    
    database.ref("리뷰목록/" + key).set({
      id:id,
      title: title,
      pass: pass,
      contents: contents,
      regdate: new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .replace("T", " ")
        .replace(/\..*/, ""),
      rating:rating,
    });
  }

  return (
      <SafeAreaView>
        <View>
          <TextInput
            placeholder="title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="pass"
            value={pass}
            onChangeText={(text) => setPass(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="contents"
            value={contents}
            onChangeText={(text) => setContents(text)}
            style={styles.inputReview}
            multiline={true}
          />
          <TextInput value={rating} style={{width:0, height:0}}/>
          <View style={styles.center}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                reviewlist();
                navigation.navigate("ReviewListScreen");
              }}
            >
              <Text style={styles.text}>저장</Text>
            </TouchableOpacity>
            
          </View>
            
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    height: "15%",
    width: "80%",
    borderRadius: 15,
    marginTop: 20,
    marginLeft: "10%",
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputReview: {
    height: "40%",
    padding: 10,
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 20,
    width: "80%",
    marginLeft: "10%",
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  center: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    paddingVertical: 8,
    width: "15%",
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});