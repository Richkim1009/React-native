import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';
import { MaterialIcons } from '@expo/vector-icons';

const data = [
    {
        id: "123",
        title: "G Taxi",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
        icon: "local-taxi"
    },
    {
        id:"456",
        title: "A irport",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",
        icon: 'airport-shuttle'
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList 
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({item}) => (
                <TouchableOpacity 
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                disabled={!origin}
                >
                    <View style={tw`${!origin && "opacity-20"}`}>
                        <MaterialIcons name={item.icon} size={50} color="black" />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon 
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name="airport-shuttle" color="white" type="MaterialIcons" />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions
