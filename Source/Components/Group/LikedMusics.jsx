import React from 'react';
import { Layout } from '@ui-kitten/components';
import { GetLikedMusics } from '../../Api/Music/Music';
import MusicGroup from './MusicGroup';
import { CONTEXT_SEARCH } from './Extras/Constants';

export class LikedMusics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsFetching: false,
		};
	}

	componentDidMount() {
		this.setState({ IsFetching: true });
		GetLikedMusics()
			.then((ApiResult) => {
				this.setState({ ApiResult, IsFetching: false });
			})
			.catch(() => { });
	}

	render() {
		const { ApiResult, IsFetching } = this.state;

		return (
			<Layout level="2" style={{ height: '100%' }}>
				{/* <MusicGroup
					DetailType="Liked Musics"
					ShowDetailType
					ContextType={CONTEXT_SEARCH}
					MusicIds={ApiResult ? ApiResult.MusicsId : undefined}
					IsFetching={IsFetching}
					Reverse
					Count={20}
				/> */}
			</Layout>
		);
	}
}
