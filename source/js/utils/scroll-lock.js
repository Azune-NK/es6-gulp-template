const body = document.querySelector(`body`);

const getScrollbarWidth = () => {
  const outer = document.createElement(`div`);
  outer.style.visibility = `hidden`;
  outer.style.overflow = `scroll`;
  outer.style.msOverflowStyle = `scrollbar`;
  body.appendChild(outer);
  const inner = document.createElement(`div`);
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

const getBodyScrollTop = () => {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (body && body.scrollTop)
  );
};

const disableScrolling = () => {
  const scrollWidth = getScrollbarWidth();
  body.setAttribute(`style`, `padding-right: ` + scrollWidth + `px;`);
  body.dataset.scrollY = `${getBodyScrollTop()}`;
  body.style.top = `-${body.dataset.scrollY}px`;
  body.classList.add(`scroll-lock`);
};

const enableScrolling = () =>{
  body.removeAttribute(`style`);
  body.classList.remove(`scroll-lock`);
  window.scrollTo(0, +body.dataset.scrollY);
};

export {enableScrolling, disableScrolling};
