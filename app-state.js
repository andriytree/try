const tarotFlowState = {
  currentStep: "input",
  savedQuestion: "",
  savedQuestionType: "love",
  savedSpread: "one",
  drawnCards: []
};

function setFlowStep(step) {
  tarotFlowState.currentStep = step;
  document.querySelectorAll(".step-page").forEach((page) => {
    page.classList.toggle("active", page.dataset.step === step);
  });
  document.querySelectorAll(".step-indicator-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.step === step);
  });
}
