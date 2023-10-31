import Axios from 'axios';

export function Login(data) {
	return new Promise((resolve, reject) => {
		Axios.post(`/api/login`, data)
			.then((res) => {
				resolve(res.data.success);
			})
			.catch(() => {
				reject(Error('Cannot login'));
			});
	});
}

export function Register(data) {
	return new Promise((resolve, reject) => {
		Axios.post(`/api/register`, data)
			.then((res) => {
				resolve(res.data.success);
			})
			.catch(() => {
				reject(Error('Cannot login'));
			});
	});
}

export function Logout() {
	return new Promise((resolve, reject) => {
		Axios.post(`/api/logout`)
			.then(() => {
				resolve();
			})
			.catch(() => {
				reject(Error('Cannot logout'));
			});
	});
}

export function GetAccount() {
	return new Promise((resolve, reject) => {
		Axios.get(`/api/me`)
			.then((res) => {
				resolve(res.data.Account);
			})
			.catch(() => {
				reject(Error('Cannot get account'));
			});
	});
}
