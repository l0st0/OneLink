import { debounce, isEqual } from 'lodash'
import { ColorButton } from '@/components'
import { ColorButtonWithPallete, LoadingData } from '@/features'
import { AdminContentContainer } from '@/layouts'
import { useLookQuery, useSaveLook } from '@/store'
import { Themes } from './components'

export const LookContent = () => {
  const { look } = useLookQuery()
  const { saveLook } = useSaveLook()

  if (!look) return <LoadingData />

  const onThemeClick = (theme: string) => {
    if (isEqual(theme, look.theme)) return
    saveLook({ ...look, theme })
  }

  const onBackgroundColorChange = debounce((color: string) => {
    if (isEqual(color, look.backgroundColor)) return
    saveLook({ ...look, backgroundColor: color })
  }, 800)

  const onTypeClick = (show: boolean) => {
    if (isEqual(show, look.gradient.show)) return
    saveLook({ ...look, gradient: { ...look.gradient, show } })
  }

  return (
    <AdminContentContainer className="gap-12">
      <div className="flex w-full flex-col">
        <h5>Themes</h5>
        <Themes theme={look.theme} onThemeClick={onThemeClick} />
      </div>

      {look?.theme === '0' && (
        <div className="flex w-full flex-col gap-6">
          <h5>Background</h5>

          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-4">
              <ColorButton
                onClick={() => onTypeClick(false)}
                active={!look.gradient.show}
                className="bg-neutral-900"
              >
                Solid
              </ColorButton>
              <ColorButton
                onClick={() => onTypeClick(true)}
                active={look.gradient.show}
                style={{ background: 'linear-gradient(to top, #171717, #787878)' }}
              >
                Gradient
              </ColorButton>
            </div>
          </div>

          <ColorButtonWithPallete
            color={look.backgroundColor}
            onChange={onBackgroundColorChange}
            label="Background color"
          />

          {look.gradient.show && (
            <ColorButtonWithPallete
              color={look.gradient.color}
              onChange={onBackgroundColorChange}
              label="Gradient color"
            />
          )}
        </div>
      )}
    </AdminContentContainer>
  )
}
