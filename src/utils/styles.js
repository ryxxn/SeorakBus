export const bindClassNames =
  (styles) =>
    (...classNames) => {
      return classNames.map((className) => styles[className]).join(" ");
    };