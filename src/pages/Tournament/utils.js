import { useCallback, useState } from 'react'

import { useEventListener } from '../../utils/useEventListener'

const MOBILE_WIDTH = 600

export function useIsMobile() {
  const [isMobile, setMobile] = useState(window.innerWidth <= MOBILE_WIDTH)

  const onResize = useCallback(() => {
    const width = window.innerWidth
    setMobile(width <= MOBILE_WIDTH);
  }, [])

  useEventListener('resize', onResize)

  return isMobile
}
