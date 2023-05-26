import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Spinner, List, ListItem } from '@ui-kitten/components';
import { ArtistItem } from './GroupItem/ArtistItem';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class ArtistGroup extends React.Component {
	static propTypes = {
		IsFetching: PropTypes.bool.isRequired,
		DetailType: PropTypes.string,
		ArtistIds: PropTypes.arrayOf(PropTypes.string),
		ShowDetailType: PropTypes.bool,
		Reverse: PropTypes.bool,
		Count: PropTypes.number,
		navigation: PropTypes.shape({
			navigate: PropTypes.func,
		}).isRequired,
	};

	static defaultProps = {
		DetailType: undefined,
		ArtistIds: undefined,
		ShowDetailType: false,
		Reverse: false,
		Count: 10,
	};

	constructor(props) {
		super(props);
		const { Count } = this.props;
		this.state = {
			Count,
		};
	}

	OnItemClick = (ArtistId) => {
		const { navigation } = this.props;
		navigation.navigate('Artist', { ArtistId });
	};

	render() {
		const { Count } = this.state;
		const { IsFetching, DetailType, ArtistIds, ShowDetailType, Reverse } = this.props;

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

		if (ArtistIds) {
			const Artists = ArtistIds.map((id) => ({ id }));
			const ArtistsReversed = Reverse ? [...Artists].reverse() : Artists;
			ArtistsReversed.length = Count;

			const ArtistItemWithEvent = (props) => (
				<ArtistItem {...props} OnItemClick={this.OnItemClick} />
			);

			return (
				<>
					{!ShowDetailType || (
						<ListItem title={DetailType} level="2" onPress={this.onDetailPress} />
					)}

					<List
						data={ArtistsReversed.filter((el) => el != null).map((el, order) => ({
							...el,
							order,
						}))}
						renderItem={ArtistItemWithEvent}
						onEndReachedThreshold={0.5}
						onEndReached={() => this.setState((prev) => ({ Count: prev.Count + 30 }))}
					/>
				</>
			);
		}

		return <></>;
	}
}

export default ArtistGroup;
