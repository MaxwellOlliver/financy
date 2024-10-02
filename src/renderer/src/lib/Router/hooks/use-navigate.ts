import { useContext } from 'react'
import { RouterContext } from '../context'

export const useNavigate = () => {
  const ctx = useContext(RouterContext)

  if (!ctx) {
    throw new Error('useNavigate must be used within a RouterProvider')
  }

  return {
    navigate: ctx.navigate,
    goBack: ctx.goBack
  }
}
