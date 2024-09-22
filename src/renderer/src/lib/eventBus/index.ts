type Listener = (...args: any[]) => void

export function createEventBus<TEventMap extends Record<string, Listener>>() {
  const listeners = new Map<keyof TEventMap, Set<TEventMap[keyof TEventMap]>>()

  function on<TKey extends keyof TEventMap>(event: TKey, listener: TEventMap[TKey]) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
    }

    listeners.get(event)?.add(listener)
  }

  function off<TKey extends keyof TEventMap>(event: TKey, listener: TEventMap[TKey]) {
    listeners.get(event)?.delete(listener)
  }

  function emit<TKey extends keyof TEventMap>(event: TKey, ...args: Parameters<TEventMap[TKey]>) {
    listeners.get(event)?.forEach((listener) => listener(...args))
  }

  return {
    on,
    off,
    emit
  }
}
