import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';


export async function GetApiAddress() {
	const value = await AsyncStorage.getItem('MOPServerIP');
	if (value !== null) {
		return value;
	}
	throw Error('No ip stored in local storage');
}

export async function getCookie(key) {
	const apiAddress = await GetApiAddress();
	const cookies = await CookieManager.get(apiAddress);
	return cookies[key].value;
}