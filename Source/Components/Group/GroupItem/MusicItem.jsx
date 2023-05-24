import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar, Spinner, Icon, Button,
} from '@ui-kitten/components';
import { ImageBackground } from 'react-native';
import { GetMusicById, LikeMusic } from '../../../Api/Music/Music';
import TrackPlayer from '../../Player/TrackPlayer';
import { CONTEXT_PLAYLIST } from '../Extras/Constants';
import { LikeMusicButton } from '../Extras/LikeMusicButton';

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

class MusicItemClass extends React.PureComponent {
	static propTypes = {
		id: PropTypes.string.isRequired,
		ContextType: PropTypes.string.isRequired,
		onDataReceived: PropTypes.func,
		order: PropTypes.number.isRequired,
	}

	static defaultProps = {
		onDataReceived: () => { },
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsLoadingFilePath: false,
		};
		this._IsMounted = false;
	}

	componentDidMount() {
		this._IsMounted = true;
		const { id, onDataReceived, order } = this.props;
		GetMusicById(id)
			.then((ApiResult) => {
				if (this._IsMounted) {
					this.setState({
						ApiResult,
					});
					onDataReceived(ApiResult, order);
				}
			})
			.catch();
	}

	componentWillUnmount() {
		this._IsMounted = false;
	}

	onPress = async () => {
		const { ApiResult } = this.state;
		const { ContextType, id } = this.props;
		if (ApiResult) {
			if (ContextType !== CONTEXT_PLAYLIST) {
				this.setState({ IsLoadingFilePath: true });

				if (this._IsMounted) {
					//await TrackPlayer.getInstance().AddAndPlay(ApiResult);
					this.setState({ IsLoadingFilePath: false });
				}
			} else {
				//TrackPlayer.getInstance().ChangePlayingTrack(id);
			}
		}
	}

	OnAddPress = async () => {
		const { ApiResult } = this.state;
		if (ApiResult) {
			this.setState({ IsLoadingFilePath: true });
			if (this._IsMounted) {
				//await TrackPlayer.getInstance().Add(ApiResult);
				this.setState({ IsLoadingFilePath: false });
			}
		}
	}

	render() {
		const { ApiResult, IsLoadingFilePath } = this.state;
		const { ContextType, id } = this.props;

		let MusicImage; let
			Controls;

		if (ApiResult) {
			if (ApiResult.ImagePathDeezer || ApiResult.Image) {
				MusicImage = () => (
					<Avatar
						ImageComponent={ImageBackground}
						shape="square"
						source={{
							uri: ApiResult.ImagePathDeezer
								? ApiResult.ImagePathDeezer
								: `data:image/jpeg;base64,${ApiResult.Image.toString(
									'base64',
								)}`,
						}}
					/>
				);
			} else {
				MusicImage = () => (
					<Avatar
						ImageComponent={ImageBackground}
						shape="square"
						source={require('../../../Assets/nomusic.jpg')}
					/>
				);
			}

			if (IsLoadingFilePath) {
				MusicImage = () => (
					<Spinner size="large" />
				);
			}

			Controls = () => (
				<>
					<LikeMusicButton defaultLikeState={ApiResult.IsLiked} onLike={() => LikeMusic(id)} />
					{ContextType !== CONTEXT_PLAYLIST && (
						<Button
							onPress={this.OnAddPress}
							accessoryLeft={PlusIcon}
							appearance="ghost"
							status="basic"
						/>
					)}
				</>
			);
		}

		return (
			<ListItem
				style={{ backgroundColor: 'transparent' }}
				level="2"
				onPress={this.onPress}
				title={ApiResult ? ApiResult.Title : 'Loading'}
				description={ApiResult ? ApiResult.Artist : 'Loading'}
				accessoryLeft={ApiResult ? MusicImage : undefined}
				accessoryRight={ApiResult ? Controls : undefined}
			/>
		);
	}
}

//! Weird
export const MusicItem = ({ item, onDataReceived }) => (
	<MusicItemClass
		ContextType={item.ContextType}
		id={item.id}
		order={item.order}
		onDataReceived={onDataReceived}
	/>
);

MusicItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
		ContextType: PropTypes.string,
		order: PropTypes.number,
	}).isRequired,
	onDataReceived: PropTypes.func.isRequired,
};
