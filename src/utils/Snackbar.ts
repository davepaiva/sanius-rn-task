import {Keyboard, Platform, ToastAndroid} from 'react-native';
import Snackbar from 'react-native-snackbar';

const showToast = (message: string) => {
	if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            250
        );
	} else {
		Keyboard.dismiss();
		Snackbar.show({
			text: message,
			duration: 5000,
		});
	}
};
export default showToast;
