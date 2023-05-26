import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from '@ui-kitten/components';
import { CONTEXT_SEARCH } from '../Components/Group/Extras/Constants';
import { TopBar } from '../Navigator/TopBar';
import { GetAlbumById } from '../Api/Music/Music';
import MusicGroup from '../Components/Group/MusicGroup';

class AlbumScreen extends React.Component {
	static propTypes = {
		route: PropTypes.shape({
			params: PropTypes.shape({
				AlbumId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			IsFetchingMusicsOfAlbum: false,
			MusicsOfAlbumIds: undefined,
			AlbumName: 'Loading',
		};
	}

	componentDidMount() {
		const { route } = this.props;

		this.setState({
			IsFetchingMusicsOfAlbum: true,
			MusicsOfAlbumIds: undefined,
		});

		GetAlbumById(route.params.AlbumId, true).then((ApiResult) => {
			this.setState({
				IsFetchingMusicsOfAlbum: false,
				MusicsOfAlbumIds: ApiResult.MusicsId,
				AlbumName: ApiResult.Name,
			});
		});
	}

	render() {
		const { IsFetchingMusicsOfAlbum, MusicsOfAlbumIds, AlbumName } = this.state;

		return (
			<>
				<TopBar subtitle="Album" />
				<Layout level="2" style={{ height: '100%' }}>
					{/* <MusicGroup
						DetailType={AlbumName}
						ShowDetailType
						ContextType={CONTEXT_SEARCH}
						MusicIds={MusicsOfAlbumIds}
						IsFetching={IsFetchingMusicsOfAlbum}
						Count={100}
					/> */}
				</Layout>
			</>
		);
	}
}

export default AlbumScreen;
