/**
 * @format
 */

import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import App from './Source/App';
import PlaybackService from './Source/Service';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
