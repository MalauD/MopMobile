import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import { GetArtistById } from '../Api/Music/Music';
import AlbumGroup from '../Components/Group/AlbumGroup';

class ArtistScreen extends React.Component {
	static propTypes = {
		route: PropTypes.shape({
			params: PropTypes.shape({
				ArtistId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		navigation: PropTypes.shape({}).isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			IsFetchingAlbumsOfArtist: false,
			AlbumsOfArtistIds: undefined,
			ArtistName: 'Loading',
		};
	}

	componentDidMount() {
		const { route } = this.props;

		this.setState({
			IsFetchingAlbumsOfArtist: true,
			AlbumsOfArtistIds: undefined,
		});

		GetArtistById(route.params.ArtistId, true).then((ApiResult) => {
			this.setState({
				IsFetchingAlbumsOfArtist: false,
				AlbumsOfArtistIds: ApiResult.AlbumsId,
				ArtistName: ApiResult.Name,
			});
		});
	}

	render() {
		const { navigation } = this.props;
		const { IsFetchingAlbumsOfArtist, AlbumsOfArtistIds, ArtistName } = this.state;

		return (
			<>
				<TopBar subtitle="Artist" />
				<Layout level="2" style={{ height: '100%' }}>
					<AlbumGroup
						DetailType={ArtistName}
						ShowDetailType
						AlbumIds={AlbumsOfArtistIds}
						IsFetching={IsFetchingAlbumsOfArtist}
						Count={5}
						navigation={navigation}
					/>
				</Layout>
			</>
		);
	}
}

export default ArtistScreen;
