import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Spinner, List, ListItem } from '@ui-kitten/components';
import MusicElement from './GroupItem/MusicElement';
import { DefaultAccesorySet } from './GroupItem/Accessories/AccessorySets';
import TrackPlayer from '../Player/TrackPlayer';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function MusicGroup({
	title,
	onEndReached,
	musics,
	isLoading,
	elementAccessories,
	highlightedMusics,
	onMusicElementPress,
}) {
	if (isLoading) {
		return (
			<View style={styles.loading}>
				<Spinner />
			</View>
		);
	}

	return (
		<>
			<ListItem title={title} level="2" />

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
};

export default MusicGroup;
