import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { GetSuggestion } from '../../Api/User/User';
import MusicGroup from './MusicGroup';

function SuggestionGroup() {
	const [suggestedMusics, setLikedMusics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		GetSuggestion(100, 0.5, 0.3, 20)
			.then((ApiResult) => {
				setLikedMusics(ApiResult);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<Layout level="2" style={{ height: '100%' }}>
			<MusicGroup title="Suggestion" isLoading={isLoading} musics={suggestedMusics} />
		</Layout>
	);
}

export default SuggestionGroup;
