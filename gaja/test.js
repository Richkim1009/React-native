import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';

export const getDevicePushToken = () => {
    return Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then((response) =>
            response.status === 'granted'
                ? response
                : Permissions.askAsync(Permissions.NOTIFICATIONS)
        )
        .then((response) => {
            if (response.status !== 'granted') {
                return Promise.reject(new Error('Push notifications permission was rejected'));
            }

            return Notifications.getDevicePushTokenAsync();
        })
        .then(token => {
            firebase.database().ref('...').update({ pushToken: token.data });
        })
        .catch((error) => {
            console.log('Error while registering device push token', error);
        });
};