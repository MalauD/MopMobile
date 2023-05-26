import React from 'react';
import { Layout, Input, Icon, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from '../Navigator/TopBar';

const SaveIcon = (props) => <Icon {...props} name="save-outline" />;

export class PreferenceScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			IpValue: '',
		};
	}

	componentDidMount() {
		AsyncStorage.getItem('MOPServerIP')

			.then((IpValue) => {
				this.setState({
					IpValue,
				});
			})

			.catch(() => {
				// console.log(err);
			});
	}

	OnIpFieldChange = (IpValue) => {
		this.setState({
			IpValue,
		});
	};

	SaveIpToStorage = async () => {
		const { IpValue } = this.state;

		try {
			await AsyncStorage.setItem('MOPServerIP', IpValue);
		} catch (e) {
			// console.log(e);
		}
	};

	OnSave = () => {
		this.SaveIpToStorage();
	};

	render() {
		const { IpValue } = this.state;

		return (
			<>
				<TopBar subtitle="Preference" />

				<Layout style={{ height: '100%', padding: '2%' }} level="2">
					<Input
						value={IpValue}
						label="Mop Server Ip"
						placeholder="Enter a valid ip address"
						onChangeText={this.OnIpFieldChange}
					/>

					<Button onPress={this.OnSave} accessoryLeft={SaveIcon}>
						Save
					</Button>
				</Layout>
			</>
		);
	}
}
