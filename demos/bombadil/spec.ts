import {extract, always, actions, weighted} from "@antithesishq/bombadil";

const counterValue = extract((state) => {
  const el = state.document.body.querySelector("#value");
  return parseInt(el?.textContent ?? "0", 10);
});

export const counterIsPositive = always(() => counterValue.current <= 10);

const incrementButton = extract((state) => {
  const el = state.document.body.querySelector("#increment");
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    return {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
  }
  return null;
});

const decrementButton = extract((state) => {
  const el = state.document.body.querySelector("#decrement");
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    return {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
  }
  return null;
});

const incrementAction = actions(() => {
  const point = incrementButton.current;
  return point ? [{Click: {name: "increment", point}}] : [];
});

const decrementAction = actions(() => {
  const point = decrementButton.current;
  return point ? [{Click: {name: "decrement", point}}] : [];
});

export const counterActions = weighted([
  [3, incrementAction],
  [1, decrementAction],
])
