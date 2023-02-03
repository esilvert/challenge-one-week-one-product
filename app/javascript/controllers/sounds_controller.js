import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "ready",
    "game_over",
    "tic",
    "error",
    "success",
    "ready",
    "go",
  ];

  connect() {
    console.log("[Sounds] Connected");
  }

  play(event) {
    if (this.targets.find(event.params.id)) {
      console.log(`[Sounds] Playing sound id: ${event.params.id}`);

      const sound = this[`${event.params.id}Target`];

      sound.currentTime = 0;
      sound.loop = false;
      sound.play();
    } else console.log(`[Sounds] Unrocognized sound id: ${event.params.id}`);
  }

  disconnect() {}

  private;
}
