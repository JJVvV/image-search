import { useStore } from '@/hooks'
import { Pages } from '@/pages'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const store = useStore()

  if (store.isInitialized && !store.isAuthed) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Pages.NoPermission />
  }

  return children
}
