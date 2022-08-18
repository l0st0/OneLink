import { Flex, H6 } from '@/components'
import { ThemeCardButton, ThemeCardButtonContent, ThemeCardContainer } from './styles'

export const Themes = () => {
  return (
    <Flex width="100%" direction="column">
      <H6>Themes</H6>
      <ThemeCardContainer>
        <ThemeCardButton>
          <ThemeCardButtonContent>Custom theme</ThemeCardButtonContent>
        </ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
        <ThemeCardButton>Something</ThemeCardButton>
      </ThemeCardContainer>
    </Flex>
  )
}
