import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  TIMEOUT_INITIAL_DURATION = 10; // seconds
  REFRESH_RATE = 100; //ms

  timeout = null;

  static targets = ["progress"];

  connect() {
    console.log("[Timeout] Timeout initialized");

    this.timeout = window.setTimeout(
      this.onTimeout,
      this.TIMEOUT_INITIAL_DURATION * 1000
    );

    this.timeoutStart = Date.now();

    if (!this.interval)
      this.interval = window.setInterval(
        () => this.onInterval(),
        this.REFRESH_RATE
      );
  }

  disconnect() {
    if (!this.timeout) return;

    window.clearTimeout(this.timeout);

    if (!this.interval) return;

    window.clearInterval(this.interval);
  }

  refresh() {
    window.clearTimeout(this.timeout);
    console.log("[Timeout] Timeout cleared");
  }

  private;

  onTimeout() {
    console.log("[Timeout] Timeout reached, switching scene.");
    window.location = "/lose-screen";
  }

  onInterval() {
    // In theory we should use progressTarget here but for some reason this is undefined

    if (!this.hasProgressTarget) {
      console.error("[Timeout] Could not find #progress element");
      return;
    }

    const progress = Date.now() - this.timeoutStart;

    // console.log({
    //   progress,
    //   total: (progress / this.TIMEOUT_INITIAL_DURATION) * 100.0,
    // });
    this.progressTarget.value = Math.ceil(
      (1 - progress / (this.TIMEOUT_INITIAL_DURATION * 1000)) * 100.0
    );
  }
}
