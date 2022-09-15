import { OneLinkIcon } from '@/components'

export const LoadingData = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <OneLinkIcon width={40} animate /> <span>Loading data...</span>
    </div>
  )
}
