import { HexColorPicker } from 'react-colorful'
import { debounce, isEqual } from 'lodash'
import { ColorButton, Flex, H3, H6, LoadingData, Paragraph, SubH3 } from '@/components'
import { AdminContentContainer, AdminHeading } from '@/layouts'
import { useLookQuery, useSaveLook } from '@/store'
import { Themes } from './components'

export const Look = () => {
  const { data: look } = useLookQuery()
  const { mutate: saveLook } = useSaveLook()

  const onThemeClick = (theme: string) => {
    if (!look || isEqual(theme, look.theme)) return
    saveLook({ ...look, theme })
  }

  const onBackgroundColorChange = debounce((color: string) => {
    if (!look || isEqual(color, look.backgroundColor)) return
    saveLook({ ...look, backgroundColor: color })
  }, 800)

  const onTypeClick = (show: boolean) => {
    if (!look || isEqual(show, look.gradient.show)) return
    saveLook({ ...look, gradient: { ...look.gradient, show } })
  }

  return (
    <>
      <AdminHeading>
        <H3>Look</H3>
      </AdminHeading>

      {look ? (
        <AdminContentContainer gap="12">
          <Flex width="100%" direction="column">
            <H6>Themes</H6>
            <Themes theme={look.theme} onThemeClick={onThemeClick} />
          </Flex>

          {look?.theme === '0' && (
            <Flex width="100%" direction="column" gap="6">
              <H6>Background</H6>

              <Flex direction="column" gap="4">
                <SubH3>Type</SubH3>
                <Flex gap="4">
                  <Flex direction="column" align="center" gap="3">
                    <ColorButton
                      onClick={() => onTypeClick(false)}
                      active={!look.gradient.show}
                      color="#6b6b6b"
                    />
                    <Paragraph>Solid</Paragraph>
                  </Flex>
                  <Flex direction="column" align="center" gap="3">
                    <ColorButton
                      onClick={() => onTypeClick(true)}
                      active={look.gradient.show}
                      color="linear-gradient(to top, #6b6b6b, #ebebeb)"
                    />
                    <Paragraph>Gradient</Paragraph>
                  </Flex>
                </Flex>
              </Flex>

              <Flex direction="column" gap="4">
                <SubH3>Background color</SubH3>
                <ColorButton color={look.backgroundColor} />
                <HexColorPicker color={look.backgroundColor} onChange={onBackgroundColorChange} />
              </Flex>

              {look.gradient.show && (
                <Flex direction="column" gap="4">
                  <SubH3>Gradient</SubH3>
                  <ColorButton color={look.backgroundColor} />
                  {/* <HexColorPicker color={look.backgroundColor} onChange={onBackgroundColorChange} /> */}
                </Flex>
              )}
            </Flex>
          )}
        </AdminContentContainer>
      ) : (
        <LoadingData />
      )}
    </>
  )
}
