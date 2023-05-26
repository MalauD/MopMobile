import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { GetTrendingMusics } from '../../Api/Music/Trending';
import MusicGroup from './MusicGroup';

function TrendingGroup() {
	const [trendingMusics, setTrendingMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [prevPageEmpty, setPrevPageEmpty] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetTrendingMusics(0, 25)
			.then((ApiResult) => {
				setTrendingMusics(ApiResult);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	const onEndReached = () => {
		if (prevPageEmpty) return;
		GetTrendingMusics(currentPage + 1, 25).then((ApiResult) => {
			setTrendingMusics([...trendingMusics, ...ApiResult]);
			setCurrentPage(currentPage + 1);
			setPrevPageEmpty(ApiResult.length === 0);
		});
	};

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup
				title="Trending"
				isLoading={isLoading}
				musics={trendingMusics}
				onEndReached={onEndReached}
			/>
		</Layout>
	);
}

export default TrendingGroup;
