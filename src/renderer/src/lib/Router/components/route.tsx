import { useRoute } from '../hooks'
import { RouteComponentProps } from '../types'

export const Route = ({ children, path }: RouteComponentProps) => {
  const { pathname } = useRoute()

  return <div className={pathname === path ? 'contents' : 'hidden'}>{children}</div>
}
