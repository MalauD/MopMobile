import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Button, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { Header } from './UserExtras/Header';
import { Logout, GetAccount } from '../../Api/Authentication/Auth';
import { LogMyAccount, LogOutMyAccount } from '../../Action/AccountAction';

const mapStateToProps = (state) => ({
	IsLogged: state.UserAccountReducer.IsLogged,
});

function UserLayoutConnected({ IsLogged, OnRedirectLogin, dispatch }) {
	const [account, setAccount] = React.useState(undefined);

	React.useEffect(() => {
		if (!account) {
			GetAccount()
				.then((ApiAccount) => {
					setAccount(ApiAccount);
					if (ApiAccount) dispatch(LogMyAccount());
				})
				.catch(() => {
					setAccount(undefined);
					dispatch(LogOutMyAccount());
					OnRedirectLogin();
				});
		}
	}, [IsLogged, account]);

	const OnLogoutPress = () => {
		Logout()
			.then(() => {
				setAccount(undefined);
				dispatch(LogOutMyAccount());
				OnRedirectLogin();
			})
			.catch(() => {});
	};

	if (IsLogged && account) {
		return (
			<Layout style={{ height: '100%' }} level="2">
				<Header Username={account.username} likedMusicCount={account.liked_musics.length} />
				<View style={{ padding: 16 }}>
					<Button onPress={OnLogoutPress}>Logout</Button>
				</View>
			</Layout>
		);
	}
	return (
		<Layout style={{ height: '100%' }} level="2">
			<View style={{ padding: 16 }}>
				<Text category="h1">Not logged</Text>
				<Button onPress={OnRedirectLogin}>Login</Button>
			</View>
		</Layout>
	);
}

UserLayoutConnected.propTypes = {
	IsLogged: PropTypes.bool.isRequired,
	OnRedirectLogin: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const UserLayout = connect(mapStateToProps)(UserLayoutConnected);

export { UserLayout };
