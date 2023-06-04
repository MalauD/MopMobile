import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Layout, Button, Text, ListItem, Icon } from '@ui-kitten/components';
import { View } from 'react-native';
import { Header } from './UserExtras/Header';
import { Logout, GetAccount } from '../../Api/Authentication/Auth';
import { LogMyAccount, LogOutMyAccount } from '../../Action/AccountAction';
import LoadingLayout from '../LoadingLayout';

function LikeIcon(props) {
	return <Icon {...props} fill="#cc506c" name="heart" />;
}

function HistoryIcon(props) {
	return <Icon {...props} name="book" />;
}

function PlaylistIcon(props) {
	return <Icon {...props} name="list-outline" />;
}

function UserLayoutConnected({ dispatch, OnLikedMusicsClick, OnViewedMusicsClick }) {
	const account = useSelector((state) => state.UserAccountReducer);

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
			<ListItem title="My playlists" level="2" accessoryLeft={PlaylistIcon} />
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
};

const UserLayout = connect()(UserLayoutConnected);

export { UserLayout };
