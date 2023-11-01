import React from 'react';
import PropTypes from 'prop-types';
import { Layout, List, ListItem, Text } from '@ui-kitten/components';
import PlaylistElement from './GroupItem/PlaylistElement';
import LoadingLayout from '../Tools/LoadingLayout';

function PlaylistGroup({
	title,
	onEndReached,
	playlists,
	isLoading,
	elementAccessories,
	highlightedPlaylists,
	onPlaylistElementPress,
	hideHeader,
	onRefresh,
	refreshing,
	ListFooterComponent,
}) {
	if (isLoading) {
		return <LoadingLayout />;
	}

	return (
		<>
			{hideHeader || <ListItem title={title} level="2" />}

			<List
				data={playlists}
				renderItem={({ item, index }) => (
					<PlaylistElement
						playlist={item}
						index={index}
						moreAccessories={elementAccessories}
						highlighted={highlightedPlaylists.includes(item._id)}
						onPress={(playlist, index) => {
							onPlaylistElementPress(playlist, index);
						}}
					/>
				)}
				onEndReachedThreshold={0.5}
				onEndReached={() => onEndReached()}
				refreshing={refreshing}
				onRefresh={onRefresh}
				ListFooterComponent={() => (
					<Layout level="2" style={{ height: 250 }}>
						{ListFooterComponent ? (
							<ListFooterComponent />
						) : (
							<Text
								style={{
									textAlign: 'center',
									marginTop: 5,
									fontFamily: 'pacifico',
									fontSize: 20,
								}}
							>
								{playlists.length === 0 ? 'No playlists :(' : "That's all folks!"}
							</Text>
						)}
					</Layout>
				)}
			/>
		</>
	);
}

PlaylistGroup.propTypes = {
	playlists: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string.isRequired })).isRequired,
	isLoading: PropTypes.bool,
	title: PropTypes.string.isRequired,
	actions: PropTypes.func,
	elementAccessories: PropTypes.arrayOf(PropTypes.func),
	allowSort: PropTypes.bool,
	alwaysSort: PropTypes.bool,
	displayActionsOnSort: PropTypes.bool,
	highlightedPlaylists: PropTypes.arrayOf(PropTypes.number),
	onEndReached: PropTypes.func,
	onPlaylistElementPress: PropTypes.func,
	hideHeader: PropTypes.bool,
	onRefresh: PropTypes.func,
	refreshing: PropTypes.bool,
	ListFooterComponent: PropTypes.func,
};

PlaylistGroup.defaultProps = {
	isLoading: false,
	actions: null,
	elementAccessories: [],
	allowSort: false,
	alwaysSort: false,
	displayActionsOnSort: false,
	highlightedPlaylists: [],
	onEndReached: () => {},
	onPlaylistElementPress: () => {},
	hideHeader: false,
	onRefresh: undefined,
	refreshing: undefined,
	ListFooterComponent: undefined,
};

export default PlaylistGroup;
