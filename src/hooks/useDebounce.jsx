function useDebounce() {
  return function (func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(this, args);
      }, delay);
    };
  };
}
export default useDebounce;
