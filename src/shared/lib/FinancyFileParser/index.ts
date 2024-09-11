import { writeFileSync } from 'fs'
import { removeQuotes } from '../../utils'

export type Financy = {
  version: string
  project: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }
  purchases: {
    purchaseName: string
    value: number
    category: string
  }[]
}

const requiredProjectKeys = ['id', 'name', 'createdAt', 'updatedAt']
const requiredPurchaseKeys = ['purchaseName', 'value', 'category']

function getKeyValue(line: string) {
  const lineData = line.trim().match(/^(\w+)="(.+)"$/)

  if (!lineData) {
    throw new Error('Invalid data')
  }

  const [, key, value] = lineData

  if (!key || !value) {
    throw new Error('Invalid key value pair')
  }

  return { key, value }
}

function parser(content: string) {
  const lines = content
    .replace(/[\r]+/g, '')
    .split('\n')
    .filter((line) => line.trim() !== '')
  const version = removeQuotes(lines[0].split('=')[1])

  if (!version) {
    throw new Error('Invalid financy file')
  }

  const projectTag = lines.findIndex((l) => l === '[PROJECT]')
  const purchasesTag = lines.findIndex((l) => l === '[PURCHASES]')

  if (projectTag < 0 || purchasesTag < 0) {
    throw new Error('Invalid financy file')
  }

  const project: Record<PropertyKey, string | number> = {}

  lines.slice(projectTag + 1, purchasesTag).forEach((line) => {
    const { key, value } = getKeyValue(line)

    project[key] = removeQuotes(value)
  })

  requiredProjectKeys.forEach((key) => {
    if (!project[key]) {
      throw new Error(`Project key ${key} is required`)
    }
  })

  const purchases = lines.slice(purchasesTag + 1).map((line) => {
    const [purchaseName, value, category] = line
      .replace('- ', '')
      .split(';')
      .map((part) => {
        const { key, value } = getKeyValue(part)

        if (!requiredPurchaseKeys.includes(key)) {
          throw new Error(`Invalid purchase key ${key}`)
        }

        return value
      })

    return {
      purchaseName: removeQuotes(purchaseName),
      value: Number(removeQuotes(value)),
      category: removeQuotes(category)
    }
  })

  return { version, project: project as Financy['project'], purchases }
}

export const FinancyFileParser = {
  toObject: async (content: string | Blob) => {
    if (typeof content === 'string') {
      return parser(content)
    } else if (content instanceof Blob) {
      const contentString = await content.text()

      return parser(contentString)
    }

    throw new Error('Unsupported content type')
  },
  toString: (data: Financy) => {
    const project = Object.entries(data.project)
      .map(([key, value]) => `${key.toUpperCase()}="${value}"`)
      .join('\n')

    const purchases = data.purchases
      .map(
        (purchase) =>
          `- PURCHASE_NAME="${purchase.purchaseName}"; VALUE="${purchase.value}"; CATEGORY="${purchase.category}"`
      )
      .join('\n')

    return `#VERSION="${data.version}"\n\n[PROJECT]\n${project}\n\n[PURCHASES]\n${purchases}`
  },
  toFile: (data: Financy, path: string) => {
    const content = FinancyFileParser.toString(data)

    writeFileSync(path.endsWith('.fy') ? path : `${path}.fy`, content)
  }
}
