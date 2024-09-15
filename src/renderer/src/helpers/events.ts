import { createEventBus } from '@renderer/lib/eventBus'

export const fileBuilderEventBus = createEventBus<'add-purchase' | 'remove-purchase' | 'search'>()
