import { ThemeCardButton, ThemeCardButtonContent, ThemeCardContainer } from './styles'

interface ThemesProps {
  theme: string
  onThemeClick: (theme: string) => void
}

const themes = [{ id: 'black' }, { id: 'white' }, { id: 'orange' }]

export const Themes = ({ theme, onThemeClick }: ThemesProps) => {
  return (
    <ThemeCardContainer>
      <ThemeCardButton id="0" active={theme === '0'} onClick={() => onThemeClick('0')}>
        <ThemeCardButtonContent>Custom theme</ThemeCardButtonContent>
      </ThemeCardButton>
      {themes.map(({ id }) => (
        <ThemeCardButton key={id} id={id} active={theme === id} onClick={() => onThemeClick(id)}>
          {id}
        </ThemeCardButton>
      ))}
    </ThemeCardContainer>
  )
}
