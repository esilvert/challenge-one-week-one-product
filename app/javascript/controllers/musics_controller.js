import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["music", "icon"];

  LOW_VOLUME = 0.2;
  DEFAULT_VOLUME = 0.5;

  connect() {
    console.log("[Musics] Connected");

    const query = new URLSearchParams(window.location.search);

    if (
      (!query.has("music") || query.get("music") != "off") &&
      this.hasMusicTarget
    ) {
      console.log("[Musics] Starting music");
      this.musicTarget.play();
      this.musicTarget.volume = this.DEFAULT_VOLUME;
    }

    window.setTimeout(() => {
      if (this.hasMusicTarget)
        this.isMute = this.musicTarget.paused || this.musicTarget.duration == 0;

      if (this.hasIconTarget) this.updateIcon();
    }, 100);
  }

  disconnect() {}

  playMusic() {
    if (this.hasMusicTarget) this.musicTarget.play();
  }

  toggleMute() {
    if (this.isMute) {
      this.musicTarget.play();
    } else {
      this.musicTarget.pause();
    }

    this.isMute = !this.isMute;
    this.updateIcon();
  }

  updateIcon() {
    if (!this.hasIconTarget) return;

    if (this.isMute) {
      this.iconTarget.src = this.iconTarget.dataset.unmuteIcon;
    } else {
      this.iconTarget.src = this.iconTarget.dataset.muteIcon;
    }
  }

  lowerMusic() {
    if (this.hasMusicTarget) this.musicTarget.volume = this.LOW_VOLUME;
  }

  restoreMusic() {
    if (this.hasMusicTarget) this.musicTarget.volume = this.DEFAULT_VOLUME;
  }

  private;
}
