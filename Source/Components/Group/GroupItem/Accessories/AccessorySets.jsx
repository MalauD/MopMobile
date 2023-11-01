import React from 'react';
import {
	AddToCurrentPlaylistAccessory,
	PlayAccessory,
	PlayNextAccessory,
} from './PlayerAccessories';
import { AddToPlaylistAccessory, RemoveFromPlaylistAccessory } from './PlaylistAccesories';

const DefaultAccesorySet = [
	PlayAccessory,
	PlayNextAccessory,
	AddToCurrentPlaylistAccessory,
	AddToPlaylistAccessory,
];

const OwnPlaylistAccessorySet = (playlistId) =>
	[
		PlayAccessory,
		PlayNextAccessory,
		AddToCurrentPlaylistAccessory,
		RemoveFromPlaylistAccessory,
	].map(
		(Accessory) =>
			function (props) {
				return <Accessory playlistId={playlistId} {...props} />;
			}
	);

const QueueAccessorySet = [];

export { DefaultAccesorySet, QueueAccessorySet, OwnPlaylistAccessorySet };
