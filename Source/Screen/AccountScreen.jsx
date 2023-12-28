import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import UserLayout from '../Components/User/UserLayout';

function AccountScreen() {
	const currentUser = useSelector((state) => state.UserAccountReducer);
	const navigation = useNavigation();

	return (
		<UserLayout
			OnLikedMusicsClick={() => navigation.push('LikedMusics')}
			OnViewedMusicsClick={() => navigation.push('ViewedMusics')}
			OnOwnPlaylistClick={() =>
				navigation.push('UserPlaylists', {
					user: currentUser,
				})
			}
		/>
	);
}

export default AccountScreen;
