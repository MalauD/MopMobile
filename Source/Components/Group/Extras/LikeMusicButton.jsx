import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { LikeMusic as LikeMusicApi } from '../../../Api/Music/Music';
import { LikeMusic, UnlikeMusic } from '../../../Action/AccountAction';

export default function LikeMusicButton({ music: { _id } }) {
	const isLiked = useSelector((state) => state.UserAccountReducer.liked_musics.includes(_id));
	const dispatch = useDispatch();

	const onLikePress = () => {
		LikeMusicApi(_id)
			.then(() => {
				if (isLiked) {
					dispatch(UnlikeMusic(_id));
				} else {
					dispatch(LikeMusic(_id));
				}
			})
			.catch();
	};

	return (
		<Button
			status="basic"
			onPress={onLikePress}
			appearance="ghost"
			accessoryLeft={(evaProps) => (
				<Icon {...evaProps} fill="#cc506c" name={isLiked ? 'heart' : 'heart-outline'} />
			)}
		/>
	);
}

LikeMusicButton.propTypes = {
	music: PropTypes.shape({ _id: PropTypes.number.isRequired }).isRequired,
};
