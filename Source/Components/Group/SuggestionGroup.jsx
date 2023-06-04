import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { GetSuggestion } from '../../Api/User/User';
import MusicGroup from './MusicGroup';

function SuggestionGroup() {
	const [suggestedMusics, setSuggestedMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getSuggestion = () => {
		setIsLoading(true);
		GetSuggestion(50, 0.3, 0.1, 20)
			.then((ApiResult) => {
				setSuggestedMusics(ApiResult);
				setIsLoading(false);
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
				musics={suggestedMusics}
				onRefresh={getSuggestion}
				refreshing={isLoading}
			/>
		</Layout>
	);
}

export default SuggestionGroup;
