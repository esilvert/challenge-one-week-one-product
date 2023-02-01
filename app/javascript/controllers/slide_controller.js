import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["slide"];

  connect() {
    console.log("[Slide] Slide initialized");

    this.doSlide();
  }

  doSlide() {
    let cumulativeDuration = 0;

    this.hideAllExcept(this.slideTarget, false);

    this.slideTargets.forEach((target, index) => {
      console.log(
        `[Slide] Preparing to show node ${target} <${index}> in ${cumulativeDuration}`
      );

      window.setTimeout(() => {
        console.log(`[Slide] Now showing node ${target} <${index}>`);

        this.hideAllExcept(target, true);
      }, cumulativeDuration);

      cumulativeDuration += parseInt(target.dataset.duration ?? "0");
    });
  }

  private;

  hideAllExcept(exception, useSlideKeep = false) {
    this.slideTargets.forEach((target) => {
      if (target == exception) {
        target.classList.remove("hidden");
        return;
      }

      if (!useSlideKeep || !target.dataset.slideKeep)
        target.classList.add("hidden");
    });
  }
}
