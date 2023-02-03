import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  HARD_MODE_THRESHOLD = 30;
  ON_FIRE_THRESHOLD = 5;

  static targets = [""];

  connect() {
    console.log("[Serie] Connected");

    this.questionNo = this.element.dataset.questionNo;
    this.modulate = document.getElementById("modulate");
    this.timeoutController =
      this.application.getControllerForElementAndIdentifier(
        this.element,
        "timeout"
      );
    this.timeoutController.onIntervalCallbacks.push((timeLeft) => {
      if (timeLeft < 5000) this.modulate.classList.add("black");
      else this.modulate.classList.remove("black");
    });

    if (this.isHardMode()) {
      this.setupHard();
    } else this.setupEasy();

    const serie = parseInt(this.element.dataset.currentSerie ?? "0");

    console.log("current serie", serie);
    this.modulate.classList.remove("blue");
    this.modulate.classList.remove("red");

    if (serie > this.ON_FIRE_THRESHOLD) {
      if (this.isHardMode()) this.modulate.classList.add("red");
      else this.modulate.classList.add("blue");
    }
  }

  disconnect() {}

  isHardMode() {
    console.log(this.questionNo, this.HARD_MODE_THRESHOLD);
    return this.questionNo >= this.HARD_MODE_THRESHOLD;
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
