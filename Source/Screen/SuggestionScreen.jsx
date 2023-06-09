import React from 'react';
import { Layout } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import SuggestionGroup from '../Components/Group/SuggestionGroup';

export default function SuggestionScreen() {
	return (
		<>
			<TopBar subtitle="Explore" />
			<Layout level="1">
				<SuggestionGroup />
			</Layout>
		</>
	);
}
