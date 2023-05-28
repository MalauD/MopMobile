import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { GetLikedMusics } from '../../Api/User/User';
import MusicGroup from './MusicGroup';

function LikedMusics() {
	const [likedMusics, setLikedMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [prevPageEmpty, setPrevPageEmpty] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetLikedMusics(0, 25)
			.then((ApiResult) => {
				setLikedMusics(ApiResult);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	const onEndReached = () => {
		if (prevPageEmpty) return;
		GetLikedMusics(currentPage + 1, 25).then((ApiResult) => {
			setLikedMusics([...likedMusics, ...ApiResult]);
			setCurrentPage(currentPage + 1);
			setPrevPageEmpty(ApiResult.length === 0);
		});
	};

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup
				title="Favorites"
				isLoading={isLoading}
				musics={likedMusics}
				onEndReached={onEndReached}
			/>
		</Layout>
	);
}

export default LikedMusics;
