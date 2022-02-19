import { useEffect } from 'react'

export const useEventListener = (
  event,
  listener,
  element=window,
) => {
  useEffect(() => {
    element.addEventListener(event, listener)

    return () => {
      element.removeEventListener(event, listener)
    }
  }, [event, listener, element])
}
