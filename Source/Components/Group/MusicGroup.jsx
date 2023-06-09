import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '@ui-kitten/components';
import MusicElement from './GroupItem/MusicElement';
import { DefaultAccesorySet } from './GroupItem/Accessories/AccessorySets';
import TrackPlayer from '../Player/TrackPlayer';
import LoadingLayout from '../LoadingLayout';

function MusicGroup({
	title,
	onEndReached,
	musics,
	isLoading,
	elementAccessories,
	highlightedMusics,
	onMusicElementPress,
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
			data={musics}
			renderItem={({ item, index }) => (
				<MusicElement
					music={item}
					index={index}
					moreAccessories={elementAccessories}
					highlighted={highlightedMusics.includes(item._id)}
					onPress={onMusicElementPress}
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
					{hideHeader || <ListItem title={title} level="2" />}
				</>
			)}
		/>
	);
}

MusicGroup.propTypes = {
	musics: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.number.isRequired })).isRequired,
	isLoading: PropTypes.bool,
	title: PropTypes.string.isRequired,
	actions: PropTypes.func,
	elementAccessories: PropTypes.arrayOf(PropTypes.func),
	allowSort: PropTypes.bool,
	alwaysSort: PropTypes.bool,
	displayActionsOnSort: PropTypes.bool,
	highlightedMusics: PropTypes.arrayOf(PropTypes.number),
	onEndReached: PropTypes.func,
	onMusicElementPress: PropTypes.func,
	hideHeader: PropTypes.bool,
	onRefresh: PropTypes.func,
	refreshing: PropTypes.bool,
	ListHeaderComponent: PropTypes.elementType,
};

MusicGroup.defaultProps = {
	isLoading: false,
	actions: null,
	elementAccessories: DefaultAccesorySet,
	allowSort: false,
	alwaysSort: false,
	displayActionsOnSort: false,
	highlightedMusics: [],
	onEndReached: () => {},
	onMusicElementPress: (music, _) => {
		TrackPlayer.removeAllAndPlay(music);
	},
	hideHeader: false,
	onRefresh: undefined,
	refreshing: undefined,
	ListHeaderComponent: undefined,
};

export default MusicGroup;
