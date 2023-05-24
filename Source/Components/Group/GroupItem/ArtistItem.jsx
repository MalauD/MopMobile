import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetArtistById } from '../../../Api/Music/Music';

class ArtistItemClass extends React.PureComponent {
	static propTypes = {
		id: PropTypes.string.isRequired,
		OnItemClick: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
		const { id } = this.props;
		GetArtistById(id)
			.then((ApiResult) => {
				if (this._IsMounted) {
					this.setState({
						ApiResult,
					});
				}
			})
			.catch();
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = async () => {
		const { OnItemClick } = this.props;
		const { ApiResult } = this.state;
		if (ApiResult) { OnItemClick(ApiResult._id); }
	}

	render() {
		const { ApiResult } = this.state;

		let ArtistImage;

		if (ApiResult) {
			if (ApiResult.ImagePath) {
				ArtistImage = () => (
					<Avatar
						ImageComponent={ImageBackground}
						shape="round"
						source={{ uri: ApiResult.ImagePath }}
					/>
				);
			} else {
				ArtistImage = () => (
					<Avatar
						ImageComponent={ImageBackground}
						shape="round"
						source={require('../../../Assets/nomusic.jpg')}
					/>
				);
			}
		}


		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={ApiResult ? ApiResult.Name : 'Loading'}
				accessoryLeft={ApiResult ? ArtistImage : undefined}
			/>
		);
	}
}

//! Weird
export const ArtistItem = ({ item, OnItemClick }) => (
	<ArtistItemClass
		id={item.id}
		OnItemClick={OnItemClick}
	/>
);

ArtistItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
	}).isRequired,
	OnItemClick: PropTypes.func.isRequired,
};
