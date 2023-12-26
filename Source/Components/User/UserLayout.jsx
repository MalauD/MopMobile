import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Layout, Button, ListItem, Icon } from '@ui-kitten/components';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './UserExtras/Header';
import { Logout } from '../../Api/Authentication/Auth';
import { LogOutMyAccount } from '../../Action/AccountAction';
import LoadingLayout from '../Tools/LoadingLayout';

function LikeIcon(props) {
	return <Icon {...props} fill="#cc506c" name="heart" />;
}

function HistoryIcon(props) {
	return <Icon {...props} name="book" />;
}

function PlaylistIcon(props) {
	return <Icon {...props} name="list-outline" />;
}

function SettingsIcon(props) {
	return <Icon {...props} name="settings-outline" />;
}

function UserLayoutConnected({
	dispatch,
	OnLikedMusicsClick,
	OnViewedMusicsClick,
	OnOwnPlaylistClick,
}) {
	const account = useSelector((state) => state.UserAccountReducer);
	const navigation = useNavigation();

	const OnLogoutPress = () => {
		Logout()
			.then(() => {
				dispatch(LogOutMyAccount());
			})
			.catch(() => {});
	};

	if (account === null) return <LoadingLayout />;

	return (
		<Layout style={{ height: '100%' }} level="2">
			<Header Username={account.username} likedMusicCount={account.liked_musics.length} />
			<ListItem
				title="Liked Musics"
				level="2"
				accessoryLeft={LikeIcon}
				onPress={OnLikedMusicsClick}
			/>
			<ListItem
				title="History"
				level="2"
				accessoryLeft={HistoryIcon}
				onPress={OnViewedMusicsClick}
			/>
			<ListItem
				title="My playlists"
				level="2"
				accessoryLeft={PlaylistIcon}
				onPress={OnOwnPlaylistClick}
			/>
			<ListItem
				title="Settings"
				level="2"
				accessoryLeft={SettingsIcon}
				onPress={() => navigation.push('Settings')}
			/>

			<View style={{ padding: 16 }}>
				<Button onPress={OnLogoutPress}>Logout</Button>
			</View>
		</Layout>
	);
}

UserLayoutConnected.propTypes = {
	dispatch: PropTypes.func.isRequired,
	OnLikedMusicsClick: PropTypes.func.isRequired,
	OnViewedMusicsClick: PropTypes.func.isRequired,
	OnOwnPlaylistClick: PropTypes.func.isRequired,
};

const UserLayout = connect()(UserLayoutConnected);

export default UserLayout;
