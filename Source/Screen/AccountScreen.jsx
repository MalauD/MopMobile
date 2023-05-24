import React from 'react';
import { ViewPager } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import { LoginLayout } from '../Components/Authentication/LoginLayout';
import { RegisterLayout } from '../Components/Authentication/RegisterLayout';
import { UserLayout } from '../Components/User/UserLayout';

const ScreenName = ['Login', 'Register', 'Account'];


const AccountScreen = () => {
	const [selectedIndex, setSelectedIndex] = React.useState(2);
	console.log(selectedIndex);
	return (
		<>
			<TopBar subtitle={ScreenName[selectedIndex]} />
			<ViewPager
				selectedIndex={selectedIndex}
				onSelect={(index) => setSelectedIndex(index)}
				swipeEnabled={false}
			>
				<LoginLayout
					ChangeToRegister={() => setSelectedIndex(1)}
					OnLoginSuccess={() => setSelectedIndex(2)}
				/>
				<RegisterLayout
					ChangeToLogin={() => setSelectedIndex(0)}
					OnRegisterSuccess={() => setSelectedIndex(2)}
				/>
				<UserLayout
					OnRedirectLogin={() => setSelectedIndex(0)}
				/>
			</ViewPager>
		</>
	);
};

export { AccountScreen };
