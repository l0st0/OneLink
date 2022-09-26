import { useIsMutating } from '@tanstack/react-query'
import { TextButton } from '@/components'
import { TopBar } from '@/layouts'
import { useNameQuery } from '@/store'
import { NamePage } from '.'

export const Preview = () => {
  const mutating = useIsMutating()

  const { name } = useNameQuery()

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

      <div className="mt-10 flex items-center justify-center">
        <div className="flex h-[600px] w-[300px] rounded-[32px] border-4 border-black text-black">
          <NamePage paramName={name?.name} preview mutating={!!mutating} />
        </div>
      </div>
    </div>
  )
}
