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
import {ref} from '../firebase';

export default function review({route}) {
  const [title, setTitle] = useState("");
  const [pass, setPass] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating]=useState("");
  // 데이터 불러오기
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const [img, setImg] = useState('');

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

  function reviewlist() {
    var key = route.params;
    var postData = {
      title: title,
      contents : contents,
      pass : pass,
      rating : rating,
      regdate : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')
    }
    var updates = {};
    updates['리뷰목록/test/' + key] = postData;

    return database.ref().update(updates);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Modal useState
  const [visible, setVisible] = useState(false);

  // Rating Component
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled = "../assets/star_filled.png";
  const starImgCorner = "../assets/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((items, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={items}
              onPress={() => setDefaultRating(items)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  items <= defaultRating
                    ? require(starImgFilled)
                    : require(starImgCorner)
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const ModalOptions = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);

    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
  //////////////////////////////////////////////////////////////////////
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
          <View style={styles.center}>
            <TouchableOpacity>
            <ModalOptions visible={visible}>
    <View style={{ alignItems: 'center' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Image
            source={require("../assets/x.png")}
            style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View>
    </View>
    <View style={{ alignItems: 'center' }}>
      <Image
        source={{uri: img}}
        style={{ height: 150, width: 150, marginVertical: 10 }}
      />
    </View>
    <Text style={{ marginVertical: 30, fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>
      Good Bye!{"\n"}How was your trip?
    </Text>
    <CustomRatingBar />
    <Text style={styles.textStyle}>
      {defaultRating + ' / ' + maxRating.length}
    </Text>
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.buttonStyle}
      onPress={() => {
        setRating(defaultRating);
        setVisible(false);
      }}
    >
      <Text
        style={tw`text-white font-semibold text-lg`}
      >
        Rating
      </Text>
    </TouchableOpacity>
  </ModalOptions>
              <TouchableOpacity style={styles.button2} onPress={() => setVisible(true)}>
                 <Text style={styles.text}>별점 주기</Text>
                </TouchableOpacity>
            </TouchableOpacity>
          </View>
            
        </View>
        <View>
        <TouchableOpacity
              style={styles.button}
              onPress={() => {
                reviewlist();
                navigation.navigate("ReviewList");
              }}
            >
              <Text style={styles.text}>저장</Text>
             
            </TouchableOpacity>
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
    width: 300,
    height: 38,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 10,
    top: -70,
    left: 45
  },
  button2: {
    alignItems: "center",
    paddingVertical: 8,
    width: 300,
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
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "69%",
    width: "70%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 20,
    fontWeight: "bold",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 9,
    borderRadius: 20,
    backgroundColor: "black",
  },
});
