import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useTheme } from '@ui-kitten/components';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import RNTrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import PlayerSmallControls from './Extras/PlayerSmallControls';
import useProgressState from '../../Hooks/useProgressState';

function PlayerOverlay() {
	const theme = useTheme();

	const navigation = useNavigation();
	const playbackState = usePlaybackState().state;
	const [progress, seekTo] = useProgressState(200);
	const [longPress, setLongPress] = React.useState(false);
	const [barLength, setBarLength] = React.useState(0);

	const dragPosition = useSharedValue(0);

	const pan = Gesture.Pan()
		.activateAfterLongPress(500)
		.onStart(() => {
			runOnJS(setLongPress)(true);
		})
		.onUpdate((event) => {
			dragPosition.value = event.x;
		})
		.onEnd((event) => {
			runOnJS(setLongPress)(false);
			const newPosition = (event.x / barLength) * progress.duration;
			runOnJS(seekTo)(newPosition);
		});

	const tap = Gesture.Tap().onEnd((e) => {
		if (e.x < (8 * barLength) / 10) {
			runOnJS(navigation.navigate)('Player');
		}
	});

	const fling_right = Gesture.Fling()
		.direction(Directions.RIGHT)
		.onEnd(() => {
			runOnJS(RNTrackPlayer.skipToPrevious)();
		});

	const fling_left = Gesture.Fling()
		.direction(Directions.LEFT)
		.onEnd(() => {
			runOnJS(RNTrackPlayer.skipToNext)();
		});

	const composed = Gesture.Exclusive(fling_right, fling_left, pan, tap);

	const barStyle = useAnimatedStyle(() => ({
		width: longPress
			? `${(dragPosition.value / barLength) * 100}%`
			: `${(progress.position / progress.duration) * 100}%`,
	}));

	if (
		playbackState === undefined ||
		playbackState === State.None ||
		playbackState === State.Stopped
	)
		return null;
	return (
		<GestureDetector gesture={composed}>
			<Animated.View
				style={{
					position: 'absolute',
					right: 0,
					left: 0,
					bottom: 0,
					padding: '2.5%',
					alignItems: 'center',
					gap: 0,
				}}
				onLayout={(event) => {
					setBarLength(event.nativeEvent.layout.width);
				}}
			>
				<View
					style={{
						zIndex: 100,
						height: 3,
						width: '100%',
						flexDirection: 'row',
						paddingBottom: 0,
						marginBottom: 0,
						backgroundColor: theme['color-primary-900'],
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
					}}
				>
					<Animated.View
						style={[
							{
								position: 'relative',
								borderTopLeftRadius: 10,
								backgroundColor: theme['color-primary-500'],
								height: 3,
							},
							barStyle,
						]}
					/>
				</View>
				<PlayerSmallControls />
			</Animated.View>
		</GestureDetector>
	);
}

export default PlayerOverlay;
