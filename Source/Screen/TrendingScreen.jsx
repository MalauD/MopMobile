import React from 'react';
import { Layout } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import TrendingGroup from '../Components/Group/TrendingGroup';

export default function TrendingScreen() {
	return (
		<>
			<TopBar subtitle="Trending" />
			<Layout level="1">
				<TrendingGroup />
			</Layout>
		</>
	);
}
