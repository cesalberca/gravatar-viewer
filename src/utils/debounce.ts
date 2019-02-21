// https://gist.github.com/peduarte/7ee475dd0fae1940f857582ecbb9dc5f
export function debounce(func: Function, wait = 100) {
  let timeout: number;
  return function(...args: any[]) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, wait);
  };
}
