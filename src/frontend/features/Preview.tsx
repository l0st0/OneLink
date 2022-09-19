import { useIsMutating } from '@tanstack/react-query'
import { TextButton } from '@/components'
import { TopBar } from '@/layouts'
import { useNameDataQuery, useNameQuery } from '@/store'

export const Preview = () => {
  const mutating = useIsMutating()

  const { name } = useNameQuery()
  const { nameData } = useNameDataQuery()

  return (
    <div className="relative bg-white p-8">
      <div className="sticky top-6 z-50">
        <TopBar theme="dark">
          <div className="flex items-center justify-between gap-20">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">My OneLink:</p>
              <p className="font-extralight">https://onelink.ooo/{name?.name}</p>
            </div>
            <TextButton className="pr-0">Share</TextButton>
          </div>
        </TopBar>
      </div>

      {!!mutating && <div>Mutating</div>}

      <div className="flex w-full text-black">{JSON.stringify(nameData)}</div>
    </div>
  )
}
