import React from 'react';
import PropTypes from 'prop-types';
import { Layout, List, ListItem, Text } from '@ui-kitten/components';
import ArtistElement from './GroupItem/ArtistElement';
import { DefaultAccesorySet } from './GroupItem/Accessories/AccessorySets';
import TrackPlayer from '../Player/TrackPlayer';
import LoadingLayout from '../LoadingLayout';
import { DefaultGroupAccesorySet } from './Accessories/AccessorySets';

function ArtistGroup({
	title,
	onEndReached,
	artists,
	isLoading,
	elementAccessories,
	groupAccessories,
	onArtistElementPress,
	hideHeader,
	ListHeaderComponent,
	onRefresh,
	refreshing,
}) {
	if (isLoading) {
		return <LoadingLayout />;
	}

	return (
		<List
			data={artists}
			renderItem={({ item, index }) => (
				<ArtistElement
					artist={item}
					index={index}
					moreAccessories={elementAccessories}
					onPress={onArtistElementPress}
				/>
			)}
			onEndReachedThreshold={0.1}
			onEndReached={() => onEndReached()}
			keyExtractor={(item) => `item_${item._id}`}
			refreshing={refreshing}
			onRefresh={onRefresh}
			initialNumToRender={15}
			ListHeaderComponent={() => (
				<>
					<ListHeaderComponent />
					{hideHeader || (
						<ListItem
							title={title}
							level="2"
							style={{ paddingVertical: 4, minHeight: 40 }}
							accessoryRight={() => (
								<>
									{groupAccessories.map((Accessory, index) => (
										<Accessory key={index} artists={artists} />
									))}
								</>
							)}
						/>
					)}
				</>
			)}
			ListFooterComponent={() => (
				<Layout level="2" style={{ height: 250 }}>
					<Text
						style={{
							textAlign: 'center',
							marginTop: 5,
							fontFamily: 'pacifico',
							fontSize: 20,
						}}
					>
						{artists.length === 0 ? 'No Artists :(' : "That's all folks!"}
					</Text>
				</Layout>
			)}
		/>
	);
}

ArtistGroup.propTypes = {
	artists: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.number.isRequired })).isRequired,
	isLoading: PropTypes.bool,
	title: PropTypes.string.isRequired,
	actions: PropTypes.func,
	elementAccessories: PropTypes.arrayOf(PropTypes.func),
	groupAccessories: PropTypes.arrayOf(PropTypes.func),
	allowSort: PropTypes.bool,
	alwaysSort: PropTypes.bool,
	displayActionsOnSort: PropTypes.bool,
	onEndReached: PropTypes.func,
	onArtistElementPress: PropTypes.func,
	hideHeader: PropTypes.bool,
	onRefresh: PropTypes.func,
	refreshing: PropTypes.bool,
	ListHeaderComponent: PropTypes.elementType,
};

ArtistGroup.defaultProps = {
	isLoading: false,
	actions: null,
	elementAccessories: DefaultAccesorySet,
	groupAccessories: DefaultGroupAccesorySet,
	allowSort: false,
	alwaysSort: false,
	displayActionsOnSort: false,
	onEndReached: () => {},
	onArtistElementPress: (Artist, _) => {
		TrackPlayer.removeAllAndPlay(Artist);
	},
	hideHeader: false,
	onRefresh: undefined,
	refreshing: undefined,
	ListHeaderComponent: () => null,
};

export default ArtistGroup;
