import { AddAllToCurrentPlaylistAccessory, PlayAllAccessory } from './PlayerAccessory';
import { SaveToPlaylistAccessory } from './PlaylistAccessory';

const DefaultGroupAccesorySet = [AddAllToCurrentPlaylistAccessory, PlayAllAccessory];
const QueueGroupAccessorySet = [SaveToPlaylistAccessory];

export { DefaultGroupAccesorySet, QueueGroupAccessorySet };
