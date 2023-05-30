import React from 'react';
import PropTypes from 'prop-types';
import { set, useForm } from 'react-hook-form';
import { Layout, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Register } from '../../Api/Authentication/Auth';
import { LogMyAccount } from '../../Action/AccountAction';
import useServerIp from '../../Hooks/useServerIp';

function RegisterLayoutConnected({ ChangeToLogin, dispatch }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const [status, SetStatus] = React.useState('primary');
	const { loading, serverIp } = useServerIp();

	const onSubmit = (data) => {
		SetStatus('basic');
		Register(data)
			.then((isLoggedIn) => {
				if (isLoggedIn) {
					SetStatus('success');
					dispatch(LogMyAccount());
					SetStatus('primary');
				} else {
					SetStatus('warning');
				}
			})
			.catch((err) => {
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
				name="name"
				placeholder="Enter your username"
				status={status}
				caption={errors.username && 'Username is required and must be valid.'}
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
				placeholder="Enter your password"
				status={status}
				caption={
					errors.password && 'Password is required and should be at least 8 characters.'
				}
				textContentType="password"
				secureTextEntry
				style={{ marginTop: '1%', marginBottom: '4%' }}
				onChangeText={(text) => {
					setValue('password', text);
				}}
				{...register('password', { required: true, minLength: 8 })}
			/>

			<Button title="Submit" onPress={handleSubmit(onSubmit)} disabled={loading}>
				Register to {serverIp}
			</Button>
			<Button
				style={{ marginTop: '1%', marginBottom: '4%' }}
				onPress={ChangeToLogin}
				appearance="ghost"
			>
				Use an existing account
			</Button>
		</Layout>
	);
}

RegisterLayoutConnected.propTypes = {
	ChangeToLogin: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const RegisterLayout = connect()(RegisterLayoutConnected);

export default RegisterLayout;
