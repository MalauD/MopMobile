import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../Api/User/User';
import { LogMyAccount, LogOutMyAccount } from '../Action/AccountAction';

export default function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const IsLogged = useSelector((state) => state.UserAccountReducer !== null);
	const dispatch = useDispatch();

	useEffect(() => {
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
	}, [IsLogged]);

	return { user, loading };
}
