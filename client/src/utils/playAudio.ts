export function playAudio(audio: HTMLAudioElement | null) {
  if (!audio) return;
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  try {
    audio.play();
  } catch (e) {
    console.log(e);
  }
}
