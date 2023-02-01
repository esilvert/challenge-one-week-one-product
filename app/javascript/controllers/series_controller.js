import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  HARD_MODE_THRESHOLD = 30;

  connect() {
    console.log("[Serie] Connected");

    this.serieLength = this.element.dataset.serieLength;

    if (this.isHardMode()) {
      this.setupHard();
    } else this.setupEasy();
  }

  disconnect() {}

  isHardMode() {
    console.log(this.serieLength);
    return this.serieLength >= this.HARD_MODE_THRESHOLD;
  }

  setupHard() {
    const top = document.getElementById("top");
    top.classList.add("gradient-red");
    top.classList.remove("gradient-blue");
  }

  setupEasy() {
    const top = document.getElementById("top");
    top.classList.add("gradient-blue");
    top.classList.remove("gradient-red");
  }
}
