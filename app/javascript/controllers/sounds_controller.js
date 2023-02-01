import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["music"];

  connect() {
    console.log("[Sounds] Connected");

    const query = new URLSearchParams(window.location.search);

    if (!query.has("music") || query.get("music") != "off") {
      console.log("[Sounds] Starting music");
      this.musicTarget.play();
    }
  }

  disconnect() {}

  private;
}
