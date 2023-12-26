import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Layout, ListItem, Select, IndexPath, SelectItem } from '@ui-kitten/components';
import { set } from 'react-hook-form';
import { GetPreferedFormat, SetPreferedFormat } from '../Api/User/User';
import LoadingLayout from '../Components/Tools/LoadingLayout';

const formats = ['MP3 128kbit/s', 'MP3 320kbit/s', 'Flac'];
const api_formats = ['MP3_128', 'MP3_320', 'FLAC'];

function SettingsScreen() {
	const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		GetPreferedFormat().then((res) => {
			setSelectedIndex(new IndexPath(api_formats.indexOf(res)));
			setIsLoading(false);
		});
	}, []);

	const OnFormatChange = (index) => {
		SetPreferedFormat(api_formats[index.row]).then(() => {
			setSelectedIndex(index);
		});
	};

	if (isLoading) return <LoadingLayout />;

	return (
		<>
			<ListItem title="Settings" />
			<Layout level="1" style={{ height: '100%', paddingHorizontal: 15 }}>
				<Select
					label="Audio Quality"
					selectedIndex={selectedIndex}
					onSelect={OnFormatChange}
					value={formats[selectedIndex.row]}
				>
					{formats.map((format) => (
						<SelectItem key={format} title={format} />
					))}
				</Select>
			</Layout>
		</>
	);
}

export default SettingsScreen;
