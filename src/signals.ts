import { Signal } from "signal-polyfill";

/*
 * State
 */

export function $state<T>(initial: T) {
  return new Signal.State<T>(initial);
}

/*
 * Derived
 */

export function $derived<T>(
  computation: () => T,
  options?: Signal.Options<T> | undefined,
) {
  return new Signal.Computed<T>(computation, options);
}

/*
 * Effect
 */

let needsEnqueue = true;

const w = new Signal.subtle.Watcher(() => {
  if (needsEnqueue) {
    needsEnqueue = false;
    queueMicrotask(processPending);
  }
});

function processPending() {
  needsEnqueue = true;

  for (const s of w.getPending()) {
    s.get();
  }

  w.watch();
}

export function $effect<T>(callback: () => T) {
  let cleanup: T;

  const computed = new Signal.Computed(() => {
    typeof cleanup === "function" && cleanup();
    cleanup = callback();
  });

  w.watch(computed);
  computed.get();

  return () => {
    w.unwatch(computed);
    typeof cleanup === "function" && cleanup();
  };
}
