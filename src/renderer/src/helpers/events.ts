import { createEventBus } from '@renderer/lib/eventBus'

type FileBuilderEventMap = {
  'add-purchase': (props: { projectId: string }) => void
  'remove-purchase': (projectId: string, purchaseId: string) => void
  search: (props: { search: string }) => void
  filter: (filter: { category?: string | undefined; maxValue?: number; minValue?: number }) => void
}

export const fileBuilderEventBus = createEventBus<FileBuilderEventMap>()
