import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { GetUser } from '../Api/User/User';
import { LogMyAccount, LogOutMyAccount } from '../Action/AccountAction';
import { GetApiAddress } from '../Api/ApiUtils';

export default function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const IsLogged = useSelector((state) => state.UserAccountReducer !== null);
	const dispatch = useDispatch();

	useEffect(() => {
		GetApiAddress().then((ip) => {
			Axios.defaults.baseURL = ip;
			GetUser()
				.then((data) => {
					setUser(data);
					dispatch(LogMyAccount(data));
					setLoading(false);
				})
				.catch(() => {
					setUser(null);
					dispatch(LogOutMyAccount());
					setLoading(false);
				});
		});
	}, [IsLogged]);

	return { user, loading };
}
