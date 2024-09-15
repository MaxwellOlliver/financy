type Listener = (data?: any) => void

export function createEventBus<TEventName extends string>() {
  const listeners = new Map<string, Set<Listener>>()

  function on(event: TEventName, listener: Listener) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
    }

    listeners.get(event)?.add(listener)
  }

  function off(event: TEventName, listener: Listener) {
    if (!listeners.has(event)) {
      return
    }

    listeners.get(event)?.delete(listener)
  }

  function emit(event: TEventName, data?: any) {
    if (!listeners.has(event)) {
      return
    }

    listeners.get(event)?.forEach((listener) => listener(data))
  }

  return {
    on,
    off,
    emit
  }
}
