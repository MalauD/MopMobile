import React from 'react';
import { ViewPager } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import { UserLayout } from '../Components/User/UserLayout';
import LikedMusics from '../Components/Group/LikedMusics';
import ViewedMusics from '../Components/Group/ViewedMusics';

function AccountScreen() {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	return (
		<>
			<TopBar />
			<ViewPager selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
				<UserLayout
					OnLikedMusicsClick={() => setSelectedIndex(1)}
					OnViewedMusicsClick={() => setSelectedIndex(2)}
				/>
				<LikedMusics />
				<ViewedMusics />
			</ViewPager>
		</>
	);
}

export { AccountScreen };
