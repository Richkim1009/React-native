import React, {useState, useEffect} from 'react'
import { StyleSheet, View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setOrigin, setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';
import AccountOptions from '../components/AccountOptions';
import {auth} from '../firebase';
import LoginOption from '../components/LoginOption';

const HomeScreen = ({route}) => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState(false);
    const [push, setPush] = useState(false);
    
    useEffect(() => {
        if(route.params?.push) {
            const test = route.params.push;
            setPush(test);
        }
        if(push) {
            alert('12만원 결제가 완료되었습니다.');
        }
    }, [route.params, push])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if(user) {
              setLogin(true);
          } else {
              setLogin(false);
          }
        })
        return unsubscribe;
      }, [login])

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5 flex flex-row justify-between`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={require('./gaja.png')}
                />
                {/* <AccountOptions /> */}
                {!login && <AccountOptions />}
                {login && <LoginOption />}
            </View>
            <View style={tw`p-5`}>
            <GooglePlacesAutocomplete
                    placeholder="출발지를 입력해 주세요"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,
                            })
                        );
                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'ko'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }

});
