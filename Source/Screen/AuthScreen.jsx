import React from 'react';
import { ViewPager } from '@ui-kitten/components';
import LoginLayout from '../Components/Authentication/LoginLayout';
import RegisterLayout from '../Components/Authentication/RegisterLayout';

export default function AuthScreen() {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<ViewPager
			selectedIndex={selectedIndex}
			onSelect={(index) => setSelectedIndex(index)}
			swipeEnabled={false}
		>
			<LoginLayout ChangeToRegister={() => setSelectedIndex(1)} />
			<RegisterLayout ChangeToLogin={() => setSelectedIndex(0)} />
		</ViewPager>
	);
}
