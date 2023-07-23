import RNTrackPlayer, { Event } from 'react-native-track-player';
import TrackPlayer from './Components/Player/TrackPlayer';
import { GetRelatedMusics } from './Api/Music/Music';

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

  RNTrackPlayer.addEventListener(Event.PlaybackQueueEnded, async (event) => {
    const queue = await TrackPlayer.getQueue();
    const queueIds = queue.map((m) => m._id);
    const related = await GetRelatedMusics(queueIds, queueIds, 20);
    await TrackPlayer.addTracks(related);
    await TrackPlayer.play();
  });
}
