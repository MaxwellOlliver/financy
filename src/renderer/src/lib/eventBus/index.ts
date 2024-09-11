type Listener = (data?: any) => void

export function createEventBus() {
  const listeners = new Map<string, Set<Listener>>()

  function on(event: string, listener: Listener) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
    }

    listeners.get(event)?.add(listener)
  }

  function off(event: string, listener: Listener) {
    if (!listeners.has(event)) {
      return
    }

    listeners.get(event)?.delete(listener)
  }

  function emit(event: string, data?: any) {
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
