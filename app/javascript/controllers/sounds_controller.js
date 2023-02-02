import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["music", "icon"];

  connect() {
    console.log("[Sounds] Connected");

    const query = new URLSearchParams(window.location.search);

    if (!query.has("music") || query.get("music") != "off") {
      console.log("[Sounds] Starting music");
      this.musicTarget.play();
      this.musicTarget.volume = 0.8; // Lower the music :head_exploding:
    }

    this.isMute = false;
  }

  disconnect() {}

  toggleMute(event) {
    if (this.isMute) {
      this.musicTarget.play();
      this.iconTarget.src = this.iconTarget.dataset.muteIcon;
    } else {
      this.musicTarget.pause();
      this.iconTarget.src = this.iconTarget.dataset.unmuteIcon;
    }

    this.isMute = !this.isMute;
  }

  private;
}
