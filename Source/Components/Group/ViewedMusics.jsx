import React from 'react';
import { Layout } from '@ui-kitten/components';
import { GetViewedMusics } from '../../Api/Music/Music';
import MusicGroup from './MusicGroup';
import { CONTEXT_SEARCH } from './Extras/Constants';

export class ViewedMusics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsFetching: false,
		};
	}

	componentDidMount() {
		this.setState({ IsFetching: true });
		GetViewedMusics()
			.then((ApiResult) => {
				this.setState({ ApiResult, IsFetching: false });
			})
			.catch(() => {});
	}

	render() {
		const { ApiResult, IsFetching } = this.state;

		return (
			<Layout level="2" style={{ height: '100%' }}>
				{/* <MusicGroup
					ShowDetailType
					DetailType="Viewed Musics"
					ContextType={CONTEXT_SEARCH}
					MusicIds={ApiResult ? [...(ApiResult.MusicsId)].reverse() : undefined}
					IsFetching={IsFetching}
					Count={20}
				/> */}
			</Layout>
		);
	}
}
