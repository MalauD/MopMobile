import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@ui-kitten/components';
import React from 'react';

export function SaveToPlaylistAccessory({ musics }) {
	const navigation = useNavigation();

	const onPress = async () => {
		navigation.navigate('AddToPlaylist', {
			musics,
		});
	};

	return (
		<Button
			appearance="ghost"
			status="basic"
			style={{ paddingHorizontal: 0, paddingVertical: 0 }}
			onPress={onPress}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="save-outline" />}
		/>
	);
}
