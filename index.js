/**
 * @format
 */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './Source/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./Source/Service.js'));

