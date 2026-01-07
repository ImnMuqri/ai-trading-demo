import { driver } from "driver.js";

export const useGuidedTour = () => {
  const startTour = (steps, options = {}) => {
    const driverObj = driver({
      showProgress: false,
      allowClose: options.allowClose ?? true,
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Done",
      popoverClass: "driverjs-theme",

      onPopoverRender: (popover, { config, state }) => {
        setTimeout(() => {
          updateProgressDots(state.activeIndex, config.steps.length);
        }, 50);
      },
      steps: steps,
    });

    driverObj.drive();
    return driverObj;
  };

  const updateProgressDots = (currentIndex, totalSteps) => {
    // Remove existing dots
    const existingDots = document.querySelector(".custom-progress-dots");
    if (existingDots) {
      existingDots.remove();
    }

    // Create new dots container
    const popover = document.querySelector(".driver-popover.driverjs-theme");
    if (!popover) return;

    const progressContainer = document.createElement("div");
    progressContainer.className = "custom-progress-dots";

    // Create dots
    for (let i = 0; i < totalSteps; i++) {
      const dot = document.createElement("div");
      dot.className = `progress-dot ${i === currentIndex ? "active" : ""}`;
      progressContainer.appendChild(dot);
    }

    // Insert after title, before description
    const title = popover.querySelector(".driver-popover-title");
    const description = popover.querySelector(".driver-popover-description");

    if (title && description) {
      title.parentNode.insertBefore(progressContainer, description);
    } else if (description) {
      description.parentNode.insertBefore(progressContainer, description);
    } else {
      const footer = popover.querySelector(".driver-popover-footer");
      if (footer) {
        footer.insertAdjacentElement("beforebegin", progressContainer);
      }
    }
  };

  return {
    startTour,
  };
};
