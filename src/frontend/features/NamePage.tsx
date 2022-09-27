import React from 'react'
import clsx from 'clsx'
import { AvatarImage, AvatarText, Spinner } from '@/components'
import { isLightBrightness } from '@/utils'
import { useNameDataQuery } from '../store/queries'

interface NamePageProps {
  paramName?: string
  preview?: boolean
  mutating?: boolean
}

export const NamePage = ({ paramName = '', preview, mutating }: NamePageProps) => {
  const { namePageData, isLoading } = useNameDataQuery(paramName)

  const name = namePageData?.name
  const about = namePageData?.about[0]
  const links = namePageData?.links
  const look = namePageData?.look[0]
  const hasGradient = look?.gradient.show

  const background = hasGradient
    ? `linear-gradient(to ${look.gradient.position}, ${look.backgroundColor}, ${look.gradient.color})`
    : look?.backgroundColor

  const bgLightBrightness = React.useMemo(() => {
    if (hasGradient && look.gradient.position === 'top') return isLightBrightness(look.gradient.color)
    return isLightBrightness(look?.backgroundColor)
  }, [look])

  const textColor = bgLightBrightness ? 'text-black' : 'text-white'

  return (
    <div
      style={{ background }}
      className={clsx(
        'relative flex h-full w-full flex-col items-center gap-6 px-8 py-4',
        preview && 'rounded-[28px]'
      )}
    >
      {(mutating || isLoading) && (
        <div className={clsx('absolute top-4 left-4')}>
          <Spinner
            className={clsx('w-4', bgLightBrightness ? 'fill-black text-white' : 'fill-white text-black')}
          />
        </div>
      )}

      {namePageData && (
        <>
          <div className="mt-4 flex flex-col items-center">
            <span className="mb-4">
              {about?.image ? (
                <AvatarImage src={about.image} />
              ) : (
                <AvatarText
                  className={clsx(bgLightBrightness ? 'bg-black text-white' : 'bg-white text-black')}
                >
                  {name?.charAt(0)}
                </AvatarText>
              )}
            </span>
            <span className={clsx('text-xl font-semibold', textColor)}>
              {about?.title ? about.title : `@${name}`}
            </span>
            <span className={clsx(textColor)}>{about?.bio ? about.bio : ''}</span>
          </div>

          <div className="flex w-full flex-col items-center gap-2">
            {links?.map(({ id, show, title, url }) => {
              return (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  className={clsx(
                    'w-full max-w-xl border py-2 text-center',
                    bgLightBrightness ? 'border-black text-black' : 'border-white text-white',
                    !show && 'hidden'
                  )}
                >
                  {title}
                </a>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
