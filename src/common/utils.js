//防抖动,初始一个时间，在这个时间内结束refresh的调用，让请求次数减少
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}