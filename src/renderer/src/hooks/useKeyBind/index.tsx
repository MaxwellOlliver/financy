import { useEffect } from 'react'
import { KeyBind } from './type'

export function useKeyBind(keyBinds: KeyBind[]) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const targetKeyBinds = keyBinds.filter(
        (item) =>
          item.keyCode === e.code &&
          !item.disabled &&
          (item.shift ?? false) === e.shiftKey &&
          (item.ctrl ?? false) === e.ctrlKey &&
          (item.alt ?? false) === e.altKey
      )

      if (targetKeyBinds.length === 0) return

      const shouldPreventDefault = targetKeyBinds.some((keyBind) => keyBind.shouldPreventDefault)
      const shouldStopPropagation = targetKeyBinds.some((keyBind) => keyBind.shouldStopPropagation)

      shouldPreventDefault ?? e.preventDefault()
      shouldStopPropagation && e.stopPropagation()

      targetKeyBinds.forEach((keyBind) => keyBind.handler(e))
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyBinds])
}
