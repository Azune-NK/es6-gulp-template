import {setupModal} from '../utils/modal';

const modalFeedback = document.querySelector(`.modal--feedback`);
const modalFeedbackBtn = document.querySelectorAll(`[data-modal="feedback"]`);
const modalSuccess = document.querySelector(`.modal--success`);
const modalSuccessBtns = document.querySelectorAll(`[data-modal="success"]`);

// аргументы setupModal(modalWindow, modalBtns, openCallback, closeCallback)
const initModals = () => {
  if (modalFeedback && modalFeedbackBtn.length) {
    setupModal(modalFeedback, modalFeedbackBtn, false, false);
  }
  if (modalSuccess && modalSuccessBtns.length) {
    setupModal(modalSuccess, modalSuccessBtns, false, false);
  }
};

export {initModals};
