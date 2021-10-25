import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, View, Modal, Image, Text, TouchableOpacity, Animated } from 'react-native';

// Modal useState
const [visible, setVisible] = useState(false);

// Rating Component
const [defaultRating, setDefaultRating] = useState(2)
const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

const starImgFilled = '../assets/star_filled.png'
const starImgCorner = '../assets/star_corner.png'

const CustomRatingBar = () => {

  return (
    <View style={styles.customRatingBarStyle}>
      {
        maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? require(starImgFilled)
                    : require(starImgCorner)
                }
              />
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}



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
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const App = () => {
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
        source={require('../assets/adam1.png')}
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
      onPress={() => alert(defaultRating)}
    >
      <Text
        style={tw`text-white font-semibold text-lg`}
      >
        Rating
      </Text>
    </TouchableOpacity>
  </ModalOptions>
}



export default App

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '69%',
    width: '70%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 9,
    borderRadius: 20,
    backgroundColor: 'black',
  },
});