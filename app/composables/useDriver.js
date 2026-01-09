import { driver } from "driver.js";

const TOUR_STORAGE_KEY = "guided_tour_skipped";

const isTourEnabled = () => {
  if (process.server) return true;
  return localStorage.getItem(TOUR_STORAGE_KEY) !== "1";
};

const setTourEnabled = (enabled) => {
  if (process.server) return;

  if (enabled) {
    localStorage.removeItem(TOUR_STORAGE_KEY);
  } else {
    localStorage.setItem(TOUR_STORAGE_KEY, "1");
  }
};

export const useGuidedTour = () => {
  const hasSkippedTour = () => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(TOUR_STORAGE_KEY) === "1";
  };

  const skipTour = (driverObj) => {
    localStorage.setItem(TOUR_STORAGE_KEY, "1");
    driverObj.destroy();
  };

  const startTour = (steps, options = {}) => {
    if (hasSkippedTour()) return;

    const driverObj = driver({
      animate: true,
      showProgress: false,
      allowClose: options.allowClose ?? true,
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Done",
      popoverClass: "driverjs-theme",
      disableActiveInteraction: false,
      // stagePadding: 10, // Default 10
      // popoverOffset: 10,

      onHighlightStarted: (element, step, options) => {
        const { config, driver } = options;

        if (step.customStagePadding !== undefined) {
          config.stagePadding = step.customStagePadding;
        } else {
          config.stagePadding = 10;
        }
      },

      onPopoverRender: (popover, { config, state }) => {
        setTimeout(() => {
          updateProgressDots(state.activeIndex, config.steps.length);
        }, 50);
        const skipButton = document.createElement("button");
        skipButton.innerText = "Skip Tutorial";
        skipButton.classList.add("custom-skip-btn");
        popover.footerButtons.appendChild(skipButton);
        skipButton.addEventListener("click", () => {
          skipTour(driverObj);
        });
      },
      steps: steps,
    });

    driverObj.drive();
    return driverObj;
  };

  const resetTour = () => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
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
    resetTour,
    isTourEnabled,
    setTourEnabled,
  };
};
