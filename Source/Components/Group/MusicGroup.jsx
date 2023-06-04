import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
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
}) {
	if (isLoading) {
		return <LoadingLayout />;
	}

	return (
		<>
			{hideHeader || <ListItem title={title} level="2" />}

			<List
				data={musics}
				renderItem={({ item, index }) => (
					<MusicElement
						music={item}
						index={index}
						moreAccessories={elementAccessories}
						highlighted={highlightedMusics.includes(item._id)}
						onPress={(music, index) => {
							if (onMusicElementPress) onMusicElementPress(music, index);
							else TrackPlayer.removeAllAndPlay(music);
						}}
					/>
				)}
				onEndReachedThreshold={0.5}
				onEndReached={() => onEndReached()}
			/>
		</>
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
	onMusicElementPress: undefined,
	hideHeader: false,
};

export default MusicGroup;
