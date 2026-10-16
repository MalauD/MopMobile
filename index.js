/**
 * @format
 */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './Source/App';
import PlaybackService from './Source/Service';
import appConfig from './app.json';

const appName = appConfig.expo.name;

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
