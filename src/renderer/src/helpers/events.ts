import { createEventBus } from '@renderer/lib/eventBus'

type FileBuilderEventMap = {
  'add-purchase': (projectId: string) => void
  'remove-purchase': (projectId: string, purchaseId: string) => void
  search: (projectId: string, props: { search: string }) => void
  filter: (
    projectId: string,
    filter: { category?: string | undefined; maxValue?: number; minValue?: number }
  ) => void
  'save-file': (props: { id: string }) => void
}

export const fileBuilderEventBus = createEventBus<FileBuilderEventMap>()
