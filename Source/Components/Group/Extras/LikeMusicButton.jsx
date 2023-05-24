import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@ui-kitten/components';

const LikeOutlineIcon = (props) => <Icon {...props} name="heart-outline" />;
const LikeIcon = (props) => <Icon {...props} name="heart" />;

class LikeMusicButton extends React.Component {
	static propTypes = {
		onLike: PropTypes.func.isRequired,
		defaultLikeState: PropTypes.bool,
	}

	static defaultProps = {
		defaultLikeState: false,
	}

	constructor(props) {
		super(props);
		this.state = {
			IsLiked: props.defaultLikeState,
		};
	}

	onLikePress = () => {
		const { onLike } = this.props;
		this.setState((prevState) => ({
			IsLiked: !prevState.IsLiked,
		}), () => {
			const { IsLiked } = this.state;
			onLike(IsLiked);
		});
	}

	render() {
		const { IsLiked } = this.state;
		const IsLikeIcon = IsLiked ? LikeIcon : LikeOutlineIcon;

		return (<Button status="basic" onPress={this.onLikePress} appearance="ghost" accessoryLeft={IsLikeIcon} />);
	}
}

export { LikeMusicButton };
