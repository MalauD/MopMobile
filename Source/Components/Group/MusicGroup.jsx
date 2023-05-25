import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
	Spinner, List, ListItem,
} from '@ui-kitten/components';
import MusicElement from './GroupItem/MusicElement';
import TrackPlayer from '../Player/TrackPlayer';
import { DefaultAccesorySet } from './GroupItem/Accessories/AccessorySets';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class MusicGroup extends React.Component {
	static propTypes = {
		musics: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.number.isRequired })).isRequired,
		isLoading: PropTypes.bool,
		title: PropTypes.string.isRequired,
		actions: PropTypes.func,
		elementAccessories: PropTypes.arrayOf(PropTypes.element),
		allowSort: PropTypes.bool,
		alwaysSort: PropTypes.bool,
		displayActionsOnSort: PropTypes.bool,
		onMusicElementClick: PropTypes.func,
		highlightedMusics: PropTypes.arrayOf(PropTypes.number),
		onEndReached: PropTypes.func,
	}

	static defaultProps = {
		isLoading: false,
		actions: null,
		elementAccessories: DefaultAccesorySet,
		allowSort: false,
		alwaysSort: false,
		displayActionsOnSort: false,
		onMusicElementClick: undefined,
		highlightedMusics: [],
		onEndReached: () => { },
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {
			title,
			onEndReached,
			musics,
			isLoading,
			elementAccessories
		} = this.props;

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
					renderItem={({ item }) => (
						<MusicElement
							music={item}
							moreAccessories={elementAccessories}
						/>
					)}
					onEndReachedThreshold={0.5}
					onEndReached={() => onEndReached()}
				/>
			</>
		);
	}
}


export default MusicGroup;
