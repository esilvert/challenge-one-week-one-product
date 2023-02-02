import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  REFRESH_RATE = 100; //ms

  timeout = null;

  static targets = ["progress", "tb"];

  onIntervalCallbacks = [];

  connect() {
    console.log("[Timeout] Timeout initialized");

    if (!this.interval)
      this.interval = window.setInterval(
        () => this.onInterval(),
        this.REFRESH_RATE
      );

    this.initialTimebank = parseInt(this.element.dataset.timebank ?? "0");
    this.currentTimebank = this.initialTimebank;
  }

  disconnect() {
    if (!this.interval) return;

    window.clearInterval(this.interval);
  }

  private;

  onInterval() {
    this.updateTimebank();

    if (this.hasProgressTarget) {
      this.updateProgressBar();
    }

    this.onIntervalCallbacks.forEach((callback) =>
      callback(this.currentTimebank)
    );
  }

  updateProgressBar() {
    const progress = this.currentTimebank / this.initialTimebank;

    //console.log({
    //  initialeTimeBank: this.initialTimebank,
    //  currentTimeBank: this.currentTimebank,
    //  progress,
    //});

    // console.log({ timbank: this.currentTimebank });
    console.log(this.currentTimebank);
    this.progressTarget.value = Math.ceil(progress * 100.0);
  }

  updateTimebank() {
    this.currentTimebank -= this.REFRESH_RATE;

    this.tbTargets.forEach((form) => {
      const input = form.querySelector("input[name=tb]");

      input.value = this.currentTimebank;
    });

    if (this.currentTimebank < 0) {
      window.clearInterval(this.interval);
      console.log("[Timeout] Timeout reached, switching scene.");
      //window.location = "/lose-screen";
    }
  }
}
