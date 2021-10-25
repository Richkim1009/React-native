import React, {useState, useEffect} from 'react';
import { SafeAreaView, Button, Image, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Firebase from 'firebase';
import { ActivityIndicator } from 'react-native';
import  {firebaseConfig} from '../firebase';
import { UrlTile } from 'react-native-maps';

const InfoScreen = () => {
  if(!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  const uploadImage = async () => {
    // type-error
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED,
    ()=>{
      setUploading(true);
    },
    (error) => {
      setUploading(false);
      console.log(error);
      blob.close();
      return;
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        setUploading(false);
        console.log('downloading url : ', url);
        blob.close();
        return url;
      })
    }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri:image ? image : null}} style={{width:300, height:300}} />
      <Button title="choose picture" onPress={pickImage} />
      {!uploading?<Button title='upload' onPress={uploadImage} />:
      <ActivityIndicator size='large' color='black' />}
    </SafeAreaView>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
})