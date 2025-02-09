import { Fragment } from 'react/jsx-runtime'
import { BuilderWrapper } from './BuilderWrapper'
import { useRoute } from '@renderer/lib/router'

export function Builder() {
  const { params, sameInstanceRoutes } = useRoute<{ id: string }>()

  return (
    <Fragment>
      {sameInstanceRoutes.map((file) => (
        <div
          key={file.params?.id as string}
          className={params?.id === file.params?.id ? 'contents' : 'hidden'}
        >
          <BuilderWrapper id={file.params?.id as string} />
        </div>
      ))}
    </Fragment>
  )
}
