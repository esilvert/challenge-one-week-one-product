import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("[PlaySound] Connected");

    const soundId = this.element.dataset.soundId;
    const delay = parseInt(this.element.dataset.soundDelay ?? "1000");

    window.setTimeout(() => {
      const soundsControllerElement = document.getElementById("sounds");

      const soundsController =
        this.application.getControllerForElementAndIdentifier(
          soundsControllerElement,
          "sounds"
        );

      soundsController.play({ params: { id: soundId } });
    }, delay);
  }

  disconnect() {}

  private;
}
