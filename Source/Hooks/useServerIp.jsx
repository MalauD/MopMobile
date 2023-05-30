import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function useServerIp(deps) {
	const [serverIp, setServerIp] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AsyncStorage.getItem('MOPServerIP')
			.then((ip) => {
				setServerIp(ip);
				setLoading(false);
			})
			.catch(() => {
				setServerIp(null);
			});
	}, deps);

	return { serverIp, loading };
}
