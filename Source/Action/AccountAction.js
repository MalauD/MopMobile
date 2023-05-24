export const LOG_ACCOUNT = 'LOG_ACCOUNT';
export const LOG_OUT_ACCOUNT = 'LOG_OUT_ACCOUNT';

export function LogMyAccount() {
	return {
		type: LOG_ACCOUNT,
	};
}

export function LogOutMyAccount() {
	return {
		type: LOG_OUT_ACCOUNT,
	};
}
