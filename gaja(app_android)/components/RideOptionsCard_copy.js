import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, 
        View, Text, SafeAreaView, 
        TouchableOpacity, FlatList, Image,
        Modal, Animated
    } 
from 'react-native';
import ModalOptions from './ModalOptions'
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/core";
import { selectTravelTimeInformation } from '../slices/navSlice';
import Intl from 'intl';
import 'intl/locale-data/jsonp/ko-KR';

const data =[
    {
        id: "Gaja-X-123",
        title: "GajaX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Gaja-XL-456",
        title: "Gaja XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Gaja-LUX-789",
        title: "Gaja LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_RATE = 0.089;

const RideOptionsCard = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    // Modal useState
    const [visible, setVisible] = useState(false);

    // Rating Component
    const [defaultRating, setDefaultRating] = useState(2)
    const [maxRating, setmaxRating] = useState([1,2,3,4,5])

    const starImgFilled = '../assets/star_filled.png'
    const starImgCorner = '../assets/star_corner.png'
    // uri
    // const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    // const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    const CustomRatingBar = () =>{

        return(
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return(
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

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => {navigation.navigate("NavigateCard")}}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`left-24 py-5 text-xl`}>
                    Select a Ride - {travelTimeInformation?.distance.text}
                </Text>
            </View>

            <FlatList 
                data={data} 
                keyExtractor={(item) => item.id} 
                renderItem={({item: {id, title, multiplier, image}, item})=>(
                    <TouchableOpacity
                        onPress={() => setSelected(item)} 
                        style={tw`flex-row justify-between items-center px-10 ${
                            id === selected?.id && "bg-gray-200"
                        }`}
                    >
                        <Image 
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image }}
                        />
                        <View>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat(['ko-KR'], {
                                style: 'currency',
                                currency: 'KRW',
                            }).format(
                                ((travelTimeInformation?.duration?.value * 
                                SURGE_CHARGE_RATE * multiplier) * 400) ? 
                                (travelTimeInformation?.duration?.value * 
                                SURGE_CHARGE_RATE * multiplier) * 400 : 0
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                disabled={!selected} 
                style={tw`bg-black py-5 m-3 ${!selected && "bg-gray-300"}`}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ModalOptions visible={visible}>
                            <View style={{alignItems: 'center'}}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => setVisible(false)}>
                                <Image 
                                    source={require("../assets/x.png")} 
                                    style={{height: 30, width: 30}}/>
                                </TouchableOpacity>
                            </View>
                            </View>
                            <View style={{alignItems:'center'}}>
                            <Image 
                                source={require('../assets/adam1.png')} 
                                style={{height:150, width:150, marginVertical: 10}}
                            />
                            </View>
                            <Text style={{marginVertical: 30, fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>
                                Good Bye!{"\n"}How was your trip?
                            </Text>
                            <CustomRatingBar />
                            <Text style={styles.textStyle}>
                                {defaultRating+' / '+maxRating.length}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.buttonStyle}
                                // onPress={() => alert(defaultRating)}
                                onPress={() => {navigation.navigate("ReviewScreen")}}    
                            >
                                <Text
                                    style={tw`text-white font-semibold text-lg`}
                                >
                                    Rating
                                </Text>
                            </TouchableOpacity>
                        </ModalOptions>
                        <Text 
                            style={tw`text-center text-white text-xl`}
                            onPress={() => setVisible(true)}            
                        >
                            Choose {selected?.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard

const styles = StyleSheet.create({
      header: {
        width: '100%',
        height:40,
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
      textStyle:{
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20,
        fontWeight: 'bold',
      },
      buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15,
        padding: 9,
        borderRadius: 20,
        backgroundColor: 'black',
      },
});