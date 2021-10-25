import React, {useState, useEffect} from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { Image } from 'react-native-elements/dist/image/Image';
import { selectTravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import Intl from 'intl';
import 'intl/locale-data/jsonp/ko-KR';

const data = [
    {
        id: "GTaxi-1",
        title: "G Taxi-B",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id:"GTaxi-2", 
        title: "G Taxi-P",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "GTaxi-3",
        title: "G Taxi-E",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

let price = 0;

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const [hold, setHold] = useState(false);
    const next = () => setHold(true);

    if(hold) {
        setTimeout(() => navigation.navigate('HomeScreen', {push:true}), 5000);
    }

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('NavigateCard')}
            style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>차량 선택 - {travelTimeInformation?.distance?.text}</Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item: {id, title, multiplier, image}, item}) => (
                    <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    style={tw`flex-row justify-between px-10 items-center ${id === selected?.id && 'bg-gray-200'}`}
                    disabled={hold}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{uri: image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('ko-Kr', {
                                style:'currency',
                                currency: 'KRW'
                            }).format(
                                ((travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) * 6) ? (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) * 4 : 0
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={hold ? true : !selected} style={tw`bg-black py-3 m-3 ${hold ? 'bg-gray-300' : (!selected  && 'bg-gray-300')}`} onPress={() => {navigation.navigate('ConnectScreen', {func: next});}}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard
