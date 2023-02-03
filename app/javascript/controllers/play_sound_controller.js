import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("[PlaySound] Connected");

    const soundId = this.element.dataset.soundId;

    window.setTimeout(() => {
      const soundsControllerElement = document.getElementById("sounds");

      console.log({ elem: soundsControllerElement });
      const soundsController =
        this.application.getControllerForElementAndIdentifier(
          soundsControllerElement,
          "sounds"
        );

      soundsController.play({ params: { id: soundId } });
    }, 1000);
  }

  disconnect() {}

  private;
}
