import React from 'react';
import { Layout, Input, Icon, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import useSaveServerIp from '../Hooks/useSaveServerIp';
import useServerIp from '../Hooks/useServerIp';
import { TopBar } from '../Navigator/TopBar';
import LoadingLayout from '../Components/LoadingLayout';

function SaveIcon(props) {
	return <Icon {...props} name="save-outline" />;
}

export default function ServerIpScreen() {
	const navigation = useNavigation();
	const { serverIp, loading } = useServerIp();

	const [ipfield, setIpField] = React.useState(null);
	const saveServerIp = useSaveServerIp();

	React.useEffect(() => {
		setIpField(serverIp);
	}, [serverIp]);

	if (loading)
		return (
			<>
				<TopBar subtitle="Preference" logged={false} />
				<LoadingLayout />
			</>
		);

	const onSavePress = async () => {
		await saveServerIp(ipfield);
		navigation.navigate('Auth');
	};

	return (
		<>
			<TopBar subtitle="Preference" logged={false} />

			<Layout style={{ height: '100%', padding: '2%' }} level="2">
				<Input
					value={ipfield}
					label="Mop Server Ip"
					placeholder="Enter a valid ip address"
					onChangeText={setIpField}
				/>

				<Button
					onPress={() => onSavePress()}
					accessoryLeft={SaveIcon}
					style={{ marginVertical: 12 }}
				>
					Use this ip
				</Button>
			</Layout>
		</>
	);
}
