import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["music", "icon"];

  connect() {
    console.log("[Musics] Connected");

    const query = new URLSearchParams(window.location.search);

    if (!query.has("music") || query.get("music") != "off") {
      console.log("[Musics] Starting music");
      this.musicTarget.play();
      this.musicTarget.volume = 0.8; // Lower the music :head_exploding:
    }

    window.setTimeout(() => {
      this.isMute = this.musicTarget.paused || this.musicTarget.duration == 0;
      this.updateIcon();
      this.playMusic();
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
    if (this.isMute) {
      this.iconTarget.src = this.iconTarget.dataset.unmuteIcon;
    } else {
      this.iconTarget.src = this.iconTarget.dataset.muteIcon;
    }
  }

  private;
}
