import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Button, View, Modal, Image, Text, TouchableOpacity, Animated } from 'react-native';

const ModalOptions = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if(visible){
      setShowModal(true);
      Animated.spring(scaleValue,{
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }else{
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue:0,
        duration:300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View 
          style={[styles.modalContainer, {transform:[{scale:scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}; 

export default ModalOptions

const styles = StyleSheet.create({
  modalBackGround: {
    flex:1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height:'69%',
    width: '70%',
    backgroundColor: 'white', 
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});