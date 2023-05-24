import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function Login(data) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.post(`${url}/api/login`, data)
					.then((res) => {
						resolve(res.data.success);
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot login'));
					});
			})
			.catch((err) => reject(err));
	});
}

export function Register(data) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.post(`${url}/api/register`, data)
					.then((res) => {
						resolve(res.data.success);
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot login'));
					});
			})
			.catch((err) => reject(err));
	});
}

export function Logout() {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.post(`${url}/api/logout`)
					.then(() => {
						resolve();
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot logout'));
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetAccount() {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/api/me`)
					.then((res) => {
						resolve(res.data.Account);
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot get account'));
					});
			})
			.catch((err) => reject(err));
	});
}
