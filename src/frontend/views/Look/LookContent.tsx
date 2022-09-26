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

  const onBackgroundTypeChange = (show: boolean) => () => {
    if (isEqual(show, look.gradient.show)) return
    saveLook({ ...look, gradient: { ...look.gradient, show } })
  }

  const onBackgroundColorChange = debounce((color: string) => {
    if (isEqual(color, look.backgroundColor)) return
    saveLook({ ...look, backgroundColor: color })
  }, 1000)

  const onGradientColorChange = debounce((color: string) => {
    if (isEqual(color, look.gradient.color)) return
    saveLook({ ...look, gradient: { ...look.gradient, color } })
  }, 1000)

  const onGradientPositionChange = (position: string) => () => {
    if (isEqual(position, look.gradient.position)) return
    saveLook({ ...look, gradient: { ...look.gradient, position } })
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
          <div className="flex w-full gap-6">
            <ColorButton
              onClick={onBackgroundTypeChange(false)}
              active={!look.gradient.show}
              className="bg-neutral-900"
            >
              Solid
            </ColorButton>
            <ColorButton
              onClick={onBackgroundTypeChange(true)}
              active={look.gradient.show}
              style={{ background: 'linear-gradient(to top, #171717, #787878)' }}
            >
              Gradient
            </ColorButton>
          </div>

          <ColorButtonWithPallete
            color={look.backgroundColor}
            onChange={onBackgroundColorChange}
            label="Background color"
          />

          {look.gradient.show && (
            <>
              <ColorButtonWithPallete
                color={look.gradient.color}
                onChange={onGradientColorChange}
                label="Gradient color"
              />

              <div className="flex w-full gap-6">
                <ColorButton
                  onClick={onGradientPositionChange('top')}
                  active={look.gradient.position === 'top'}
                  gradient={{
                    position: 'top',
                    bgColor: look.backgroundColor,
                    gradientColor: look.gradient.color,
                  }}
                >
                  Gradient top
                </ColorButton>
                <ColorButton
                  onClick={onGradientPositionChange('bottom')}
                  active={look.gradient.position === 'bottom'}
                  gradient={{
                    position: 'bottom',
                    bgColor: look.backgroundColor,
                    gradientColor: look.gradient.color,
                  }}
                >
                  Gradient bottom
                </ColorButton>
              </div>
            </>
          )}
        </div>
      )}
    </AdminContentContainer>
  )
}
