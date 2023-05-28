import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { GetViewedMusics } from '../../Api/User/User';
import MusicGroup from './MusicGroup';

function ViewedMusics() {
	const [viewedMusics, setViewedMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [prevPageEmpty, setPrevPageEmpty] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetViewedMusics(0, 25)
			.then((ApiResult) => {
				setViewedMusics(ApiResult);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	const onEndReached = () => {
		if (prevPageEmpty) return;
		GetViewedMusics(currentPage + 1, 25).then((ApiResult) => {
			setViewedMusics([...viewedMusics, ...ApiResult]);
			setCurrentPage(currentPage + 1);
			setPrevPageEmpty(ApiResult.length === 0);
		});
	};

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup
				title="History"
				isLoading={isLoading}
				musics={viewedMusics}
				onEndReached={onEndReached}
			/>
		</Layout>
	);
}

export default ViewedMusics;
