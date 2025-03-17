export const isScrolledNearTop = (threshold = 0) => document.documentElement.scrollTop <= threshold;

export const isScrolledNearBottom = (threshold = 0) =>
  document.documentElement.scrollHeight - window.innerHeight - document.documentElement.scrollTop <= threshold;

export const isNonScrollable = () => document.documentElement.scrollHeight <= window.innerHeight;
