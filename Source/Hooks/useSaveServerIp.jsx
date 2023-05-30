import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useSaveServerIp() {
	const saveIp = async (ip) => {
		await AsyncStorage.setItem('MOPServerIP', ip);
	};

	return saveIp;
}
