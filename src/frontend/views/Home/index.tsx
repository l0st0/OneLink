import { IcBadgeIconFlat } from '@/components'
import { ClaimForm } from '@/features'

export const Home = () => {
  return (
    <div className="mt-20 flex flex-col gap-6">
      <div className="flex gap-6">
        <h1>You in one</h1>
        <h1 className="stroke-text-primary text-black">link.</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="mt-2 flex gap-6">
          <h4>Created on Web3</h4> <IcBadgeIconFlat width={256} />
        </div>

        <ClaimForm />
      </div>
    </div>
  )
}
