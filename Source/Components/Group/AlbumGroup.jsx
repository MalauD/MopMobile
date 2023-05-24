import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
	Spinner, List, ListItem,
} from '@ui-kitten/components';
import { AlbumItem } from './GroupItem/AlbumItem';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class AlbumGroup extends React.Component {
	static propTypes = {
		IsFetching: PropTypes.bool.isRequired,
		DetailType: PropTypes.string,
		AlbumIds: PropTypes.arrayOf(PropTypes.string),
		ShowDetailType: PropTypes.bool,
		Reverse: PropTypes.bool,
		Count: PropTypes.number,
		navigation: PropTypes.shape({
			navigate: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		DetailType: undefined,
		AlbumIds: undefined,
		ShowDetailType: false,
		Reverse: false,
		Count: 10,
	}

	constructor(props) {
		super(props);
		const { Count } = this.props;
		this.state = {
			Count,
		};
	}

	OnItemClick = (AlbumId) => {
		const { navigation } = this.props;
		navigation.navigate('Album', { AlbumId });
	}

	render() {
		const { Count } = this.state;
		const {
			IsFetching, DetailType, AlbumIds, ShowDetailType, Reverse,
		} = this.props;

		if (IsFetching) {
			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" />}
					<View style={styles.loading}>
						<Spinner />
					</View>
				</>
			);
		}

		if (AlbumIds) {
			const Albums = AlbumIds.map((id) => ({ id }));
			const AlbumsReversed = Reverse ? [...Albums].reverse() : Albums;
			AlbumsReversed.length = Count;

			const AlbumItemWithEvent = (props) => <AlbumItem {...props} OnItemClick={this.OnItemClick} />;

			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" onPress={this.onDetailPress} />}

					<List
						data={AlbumsReversed.filter((el) => el != null).map((el, order) => ({ ...el, order }))}
						renderItem={AlbumItemWithEvent}
						onEndReachedThreshold={0.5}
						onEndReached={() => this.setState((prev) => ({ Count: prev.Count + 30 }))}
					/>
				</>
			);
		}

		return <></>;
	}
}


export default AlbumGroup;
