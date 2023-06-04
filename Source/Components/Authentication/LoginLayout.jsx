import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Layout, Input, Button, Icon } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { GetAccount, Login } from '../../Api/Authentication/Auth';
import { LogMyAccount } from '../../Action/AccountAction';
import useServerIp from '../../Hooks/useServerIp';

function LoginLayoutConnected({ ChangeToRegister, dispatch }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const [status, SetStatus] = React.useState('primary');
	const [securedPasswordEntry, setSecuredPasswordEntry] = React.useState(true);
	const { loading, serverIp } = useServerIp();

	const onSubmit = (data) => {
		SetStatus('basic');
		Login(data)
			.then((isLoggedIn) => {
				if (isLoggedIn) {
					GetAccount().then((account) => {
						dispatch(LogMyAccount(account));
						SetStatus('success');
						SetStatus('primary');
					});
				} else {
					SetStatus('warning');
				}
			})
			.catch((err) => {
				SetStatus('danger');
			});
	};

	const toggleSecuredPasswordEntry = () => {
		setSecuredPasswordEntry(!securedPasswordEntry);
	};

	const renderIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecuredPasswordEntry}>
			<Icon {...props} name={securedPasswordEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	return (
		<Layout
			style={{
				height: '100%',
				paddingLeft: '6%',
				paddingRight: '6%',
				paddingTop: '2%',
			}}
			level="2"
		>
			<Input
				label="Username"
				name="username"
				placeholder="Enter your username"
				status={status}
				caption={errors.username ? 'Username is required and must be valid.' : ''}
				style={{ marginTop: '1%', marginBottom: '1%' }}
				onChangeText={(text) => {
					setValue('username', text);
				}}
				{...register('username', { required: true, minLength: 3, maxLength: 20 })}
			/>
			<Input
				label="Password"
				name="password"
				autoCompleteType="password"
				status={status}
				placeholder="Enter your password"
				caption={
					errors.password
						? 'Password is required and should be at least 8 characters.'
						: ''
				}
				textContentType="password"
				secureTextEntry={securedPasswordEntry}
				style={{ marginTop: '1%', marginBottom: '4%' }}
				onChangeText={(text) => {
					setValue('password', text);
				}}
				accessoryRight={renderIcon}
				{...register('password', { required: true, minLength: 8 })}
			/>

			<Button title="Submit" onPress={handleSubmit(onSubmit)} disabled={loading}>
				Login to {serverIp}
			</Button>
			<Button
				style={{ marginTop: '1%', marginBottom: '4%' }}
				onPress={ChangeToRegister}
				appearance="ghost"
			>
				Create an account now
			</Button>
		</Layout>
	);
}

LoginLayoutConnected.propTypes = {
	ChangeToRegister: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const LoginLayout = connect()(LoginLayoutConnected);

export default LoginLayout;
