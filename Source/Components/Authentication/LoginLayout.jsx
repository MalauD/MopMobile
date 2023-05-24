import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Layout, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Login } from '../../Api/Authentication/Auth';
import { LogMyAccount } from '../../Action/AccountAction';

function LoginLayoutConnected({ ChangeToRegister, OnLoginSuccess, dispatch }) {
	const {
		register, handleSubmit, formState: { errors }, setValue,
	} = useForm();
	const [status, SetStatus] = React.useState('primary');

	const onSubmit = (data) => {
		SetStatus('basic');
		Login(data)
			.then((isLoggedIn) => {
				if (isLoggedIn) {
					SetStatus('success');
					dispatch(LogMyAccount());
					OnLoginSuccess();
					SetStatus('primary');
				} else {
					SetStatus('warning');
				}
			})
			.catch((err) => {
				console.error(err);
				SetStatus('danger');
			});
	};

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
				caption={
					errors.username
						? 'Username is required and must be valid.'
						: ''
				}
				style={{ marginTop: '1%', marginBottom: '1%' }}
				onChangeText={(text) => { setValue('username', text) }}
				{...register(
					'username',
					{ required: true, minLength: 3, maxLength: 20 },
				)}
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
				secureTextEntry
				style={{ marginTop: '1%', marginBottom: '4%' }}
				onChangeText={(text) => { setValue('password', text) }}
				{...register('password', { required: true, minLength: 8 })}
			/>

			<Button title="Submit" onPress={handleSubmit(onSubmit)}>
				Login
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
	OnLoginSuccess: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const LoginLayout = connect()(LoginLayoutConnected);

export { LoginLayout };
