import RNTrackPlayer, { Event } from 'react-native-track-player';

export default async function PlaybackService() {
  RNTrackPlayer.addEventListener(Event.RemotePause, () => {
    RNTrackPlayer.pause();
  });

  RNTrackPlayer.addEventListener(Event.RemotePlay, () => {
    RNTrackPlayer.play();
  });

  RNTrackPlayer.addEventListener(Event.RemoteNext, () => {
    RNTrackPlayer.skipToNext();
  });

  RNTrackPlayer.addEventListener(Event.RemotePrevious, () => {
    RNTrackPlayer.skipToPrevious();
  });

  RNTrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
    RNTrackPlayer.seekBy(event.interval);
  });

  RNTrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
    RNTrackPlayer.seekBy(-event.interval);
  });

  RNTrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    RNTrackPlayer.seekTo(event.position);
  });

  RNTrackPlayer.addEventListener(Event.RemoteDuck, async (event) => {
    RNTrackPlayer.setVolume(event.ducking ? 0.5 : 1);
  });
}
