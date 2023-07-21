import React from 'react';
import PropTypes from 'prop-types';
import { Layout, List, ListItem, Text } from '@ui-kitten/components';
import AlbumElement from './GroupItem/AlbumElement';
import { DefaultAccesorySet } from './GroupItem/Accessories/AccessorySets';
import TrackPlayer from '../Player/TrackPlayer';
import LoadingLayout from '../LoadingLayout';
import { DefaultGroupAccesorySet } from './Accessories/AccessorySets';

function AlbumGroup({
	title,
	onEndReached,
	albums,
	isLoading,
	elementAccessories,
	groupAccessories,
	onAlbumElementPress,
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
			data={albums}
			renderItem={({ item, index }) => (
				<AlbumElement
					album={item}
					index={index}
					moreAccessories={elementAccessories}
					onPress={onAlbumElementPress}
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
										<Accessory key={index} albums={albums} />
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
						{albums.length === 0 ? 'No Albums :(' : "That's all folks!"}
					</Text>
				</Layout>
			)}
		/>
	);
}

AlbumGroup.propTypes = {
	albums: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.number.isRequired })).isRequired,
	isLoading: PropTypes.bool,
	title: PropTypes.string.isRequired,
	actions: PropTypes.func,
	elementAccessories: PropTypes.arrayOf(PropTypes.func),
	groupAccessories: PropTypes.arrayOf(PropTypes.func),
	allowSort: PropTypes.bool,
	alwaysSort: PropTypes.bool,
	displayActionsOnSort: PropTypes.bool,
	onEndReached: PropTypes.func,
	onAlbumElementPress: PropTypes.func,
	hideHeader: PropTypes.bool,
	onRefresh: PropTypes.func,
	refreshing: PropTypes.bool,
	ListHeaderComponent: PropTypes.elementType,
};

AlbumGroup.defaultProps = {
	isLoading: false,
	actions: null,
	elementAccessories: DefaultAccesorySet,
	groupAccessories: DefaultGroupAccesorySet,
	allowSort: false,
	alwaysSort: false,
	displayActionsOnSort: false,
	onEndReached: () => {},
	onAlbumElementPress: (Album, _) => {
		TrackPlayer.removeAllAndPlay(Album);
	},
	hideHeader: false,
	onRefresh: undefined,
	refreshing: undefined,
	ListHeaderComponent: () => null,
};

export default AlbumGroup;
