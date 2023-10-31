import React from 'react';
import { ViewPager } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { UserLayout } from '../Components/User/UserLayout';
import LikedMusics from '../Components/Group/LikedMusics';
import ViewedMusics from '../Components/Group/ViewedMusics';

function AccountScreen() {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const currentUser = useSelector((state) => state.UserAccountReducer);
	const navigation = useNavigation();

	return (
		<ViewPager selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
			<UserLayout
				OnLikedMusicsClick={() => setSelectedIndex(1)}
				OnViewedMusicsClick={() => setSelectedIndex(2)}
				OnOwnPlaylistClick={() =>
					navigation.push('UserPlaylists', {
						user: currentUser,
					})
				}
			/>
			<LikedMusics />
			<ViewedMusics />
		</ViewPager>
	);
}

export { AccountScreen };
