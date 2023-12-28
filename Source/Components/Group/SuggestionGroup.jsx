import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { GetSuggestion } from '../../Api/User/User';
import MusicGroup from './MusicGroup';

function SuggestionGroup() {
	const [suggestedMusics, setSuggestedMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [page, setPage] = useState(0);

	const addSuggestion = () => {
		if (suggestedMusics.length > 100) return;
		GetSuggestion((page + 1) * 20, 0.3, 0.1, 20)
			.then((ApiResult) => {
				setSuggestedMusics([...suggestedMusics, ...ApiResult]);
				setPage(page + 1);
			})
			.catch(() => {});
	};

	const getSuggestion = () => {
		setIsLoading(true);
		setPage(0);
		GetSuggestion(20, 0.3, 0.1, 20)
			.then((ApiResult) => {
				setSuggestedMusics(ApiResult);
				setIsLoading(false);
				setPage(1);
			})
			.catch(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getSuggestion();
	}, []);

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup
				title="Suggestion"
				includeIndexKeyExtractor
				musics={suggestedMusics}
				isLoading={isLoading}
				onEndReached={addSuggestion}
				refreshing={isRefreshing}
				onRefresh={getSuggestion}
			/>
		</Layout>
	);
}

export default SuggestionGroup;
