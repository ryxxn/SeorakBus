export const scrollToTop = (option) => {
  window.scrollTo({
    top: 0,
    ...option,
  });
};