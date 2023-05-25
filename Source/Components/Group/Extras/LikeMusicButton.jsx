import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@ui-kitten/components';

class LikeMusicButton extends React.Component {
	static propTypes = {
		onLike: PropTypes.func,
		defaultLikeState: PropTypes.bool,
	}

	static defaultProps = {
		defaultLikeState: false,
		onLike: () => { },
	}

	constructor(props) {
		super(props);
		this.state = {
			IsLiked: props.defaultLikeState,
		};
		this.iconRef = React.createRef();
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

		return (<Button status="basic" onPress={this.onLikePress} appearance="ghost" accessoryLeft={(evaProps) => <Icon {...evaProps} fill="#cc506c" name={IsLiked ? "heart" : "heart-outline"} />} />);
	}
}


export { LikeMusicButton };
