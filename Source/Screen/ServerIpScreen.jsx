import React from 'react';
import { Layout, Input, Icon, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import useSaveServerIp from '../Hooks/useSaveServerIp';
import useServerIp from '../Hooks/useServerIp';
import LoadingLayout from '../Components/LoadingLayout';

function SaveIcon(props) {
	return <Icon {...props} name="save-outline" />;
}

export default function ServerIpScreen() {
	const navigation = useNavigation();
	const { serverIp, loading } = useServerIp();

	const [ipfield, setIpField] = React.useState(null);
	const saveServerIp = useSaveServerIp();

	const [ipfieldStatus, setIpfieldStatus] = React.useState('primary');

	React.useEffect(() => {
		setIpField(serverIp);
	}, [serverIp]);

	if (loading) return <LoadingLayout />;

	const onSavePress = async () => {
		Axios.defaults.baseURL = ipfield;
		Axios.get('/health', { timeout: 2000 })
			.then(async () => {
				setIpfieldStatus('success');
				await saveServerIp(ipfield);
				navigation.navigate('Auth');
			})
			.catch(() => {
				setIpfieldStatus('danger');
			});
	};

	return (
		<Layout style={{ height: '100%', padding: '2%' }} level="2">
			<Input
				value={ipfield}
				label="Mop Server Ip"
				placeholder="Enter a valid ip address"
				onChangeText={setIpField}
				status={ipfieldStatus}
			/>

			<Button
				onPress={() => onSavePress()}
				accessoryLeft={SaveIcon}
				style={{ marginVertical: 12 }}
			>
				Use this ip
			</Button>
		</Layout>
	);
}
