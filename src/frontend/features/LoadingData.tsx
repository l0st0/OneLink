import { OneLinkIcon } from '@/components'

export const LoadingData = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <OneLinkIcon width={40} spin={true} /> <span>Loading data...</span>
    </div>
  )
}
