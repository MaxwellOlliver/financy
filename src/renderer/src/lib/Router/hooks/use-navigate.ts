import { useContext } from 'react'
import { RouterContext } from '../context'

export const useNavigate = () => {
  const ctx = useContext(RouterContext)

  if (!ctx) {
    throw new Error('useNavigate must be used within a RouterProvider')
  }

  return {
    navigate: ctx.navigate,
    registerRoute: ctx.registerRoute,
    registerAndNavigate: ctx.registerAndNavigate,
    unregisterRoute: ctx.unregisterRoute,
    unregisterAndNavigate: ctx.unregisterAndNavigate,
    goBack: ctx.goBack
  }
}
