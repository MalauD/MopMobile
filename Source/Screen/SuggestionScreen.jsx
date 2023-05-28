import React from 'react';
import { Layout, TabView, Tab } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import ViewedMusics from '../Components/Group/ViewedMusics';
import LikedMusics from '../Components/Group/LikedMusics';
import TrendingGroup from '../Components/Group/TrendingGroup';
import SuggestionGroup from '../Components/Group/SuggestionGroup';

export function SuggestionScreen() {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const shouldLoadComponent = (index) => index === selectedIndex;

	return (
		<>
			<TopBar subtitle="Explore" />
			<Layout level="1">
				<TabView
					selectedIndex={selectedIndex}
					shouldLoadComponent={shouldLoadComponent}
					onSelect={(index) => setSelectedIndex(index)}
				>
					<Tab title="Suggestion">
						<SuggestionGroup />
					</Tab>
					<Tab title="Trending">
						<TrendingGroup />
					</Tab>
					<Tab title="Favorites">
						<LikedMusics />
					</Tab>
					<Tab title="History">
						<ViewedMusics />
					</Tab>
				</TabView>
			</Layout>
		</>
	);
}
