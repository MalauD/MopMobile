import {
	AddToCurrentPlaylistAccessory,
	PlayAccessory,
	PlayNextAccessory,
} from './PlayerAccessories';

const DefaultAccesorySet = [PlayAccessory, PlayNextAccessory, AddToCurrentPlaylistAccessory];
const QueueAccessorySet = [];

export { DefaultAccesorySet, QueueAccessorySet };
