import {extract, always, actions, weighted} from "@antithesishq/bombadil";

const counterValue = extract((state) => {
  const el = state.document.body.querySelector("#value");
  return parseInt(el?.textContent ?? "0", 10);
});

export const counterNeverExceedsTen = always(() => counterValue.current <= 10);

function getPointForElement(el: Element) {
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    return {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
  }
  return null;
}

function extractClickPoint(selector: string) {
  return extract((state) => {
    const el = state.document.body.querySelector(selector);
    if (!el) return null;
    return getPointForElement(el);
  });
}

const incrementButton = extractClickPoint("#increment");
const decrementButton = extractClickPoint("#decrement");

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
