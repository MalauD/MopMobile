export const LOG_ACCOUNT = 'LOG_ACCOUNT';
export const LOG_OUT_ACCOUNT = 'LOG_OUT_ACCOUNT';
export const LIKE_MUSIC = 'LIKE_MUSIC';
export const UNLIKE_MUSIC = 'UNLIKE_MUSIC';

export function LogMyAccount(AccountData) {
	return {
		type: LOG_ACCOUNT,
		AccountData,
	};
}

export function LogOutMyAccount() {
	return {
		type: LOG_OUT_ACCOUNT,
	};
}

export function LikeMusic(MusicId) {
	return {
		type: LIKE_MUSIC,
		MusicId,
	};
}

export function UnlikeMusic(MusicId) {
	return {
		type: UNLIKE_MUSIC,
		MusicId,
	};
}