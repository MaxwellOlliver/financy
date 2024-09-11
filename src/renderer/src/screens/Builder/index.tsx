import { Body } from './Body'
import { Header } from './Header'

export function Builder() {
  return (
    <div className="flex justify-center w-full h-full py-12 px-8">
      <div className="flex flex-col w-full max-w-[1400px] gap-8">
        <Header />
        <Body />
      </div>
    </div>
  )
}
