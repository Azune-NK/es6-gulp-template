import {IECheck} from "../utils/IE-check";

const footerIe = () => {

  // прибивает футер к низу на IE
  const main = document.querySelector(`main`);
  const IE = IECheck();

  if(!main || !IE) return;

  let header = document.querySelector(`.header`);
  let footer = document.querySelector(`.footer`);
  let headerH, mainHMin, footerH;

  function mainHeight() {
    footer ?
      footerH = footer.getBoundingClientRect().height
      : footerH = 0
    header ?
      headerH = header.getBoundingClientRect().height
      : headerH = 0;
    mainHMin = document.documentElement.clientHeight;

    main.style.minHeight = mainHMin - (headerH + footerH) - 1 + 'px';
  }

  document.addEventListener('loadDOMContentLoaded', mainHeight())
  window.addEventListener('resize', mainHeight())
};

export {footerIe};
