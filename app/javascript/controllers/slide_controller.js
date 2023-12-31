import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["slide", "redirect"];

  connect() {
    console.log("[Slide] Slide initialized");

    this.doSlide();

    this.lowerMusic();

    this.onSlideEnded = () => {
      if (this.hasRedirectTarget) this.redirectTarget.click();
      this.restoreMusic();
    };
  }

  doSlide() {
    let cumulativeDuration = 0;

    this.hideAllExcept(this.slideTarget, false);

    this.slideTargets.forEach((target, index) => {
      const isLast = index == this.slideTargets.length - 1;

      console.log(
        `[Slide] Preparing to show node n°<${index}> in ${cumulativeDuration} ms`
      );

      window.setTimeout(() => {
        console.log(`[Slide] Now showing node ${target} <${index}>`);

        this.hideAllExcept(target, true);

        if (isLast && this.onSlideEnded) {
          this.onSlideEnded();
        }
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

  lowerMusic() {
    const musicsControllerElement = document.getElementById("musics");

    const musicsController =
      this.application.getControllerForElementAndIdentifier(
        musicsControllerElement,
        "musics"
      );

    musicsController.lowerMusic();
  }

  restoreMusic() {
    const musicsControllerElement = document.getElementById("musics");

    const musicsController =
      this.application.getControllerForElementAndIdentifier(
        musicsControllerElement,
        "musics"
      );

    musicsController.restoreMusic();
  }
}
