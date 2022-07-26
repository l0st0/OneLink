import clsx from 'clsx'
import { ColorButtonProps } from '@/components'

interface ThemesProps {
  theme: string
  onThemeClick: (theme: string) => void
}

const themes = [{ id: 'black' }, { id: 'white' }, { id: 'orange' }]

const ThemeCardButton = ({ children, active, ...rest }: ColorButtonProps) => (
  <button
    {...rest}
    className={clsx(
      'flex h-[200px] w-full cursor-pointer flex-col items-center rounded-primary bg-transparent py-0 text-white',
      'outline-dashed outline-1 outline-offset-4 hover:outline-primary',
      active ? 'outline-primary' : 'outline-white'
    )}
  >
    {children}
  </button>
)

export const Themes = ({ theme, onThemeClick }: ThemesProps) => {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-6 rounded-primary py-4 px-0">
      <ThemeCardButton id="0" active={theme === '0'} onClick={() => onThemeClick('0')}>
        <span className="text-md flex flex-grow items-center justify-center p-2 font-medium">
          Custom theme
        </span>
      </ThemeCardButton>
      {themes.map(({ id }) => (
        <ThemeCardButton key={id} id={id} active={theme === id} onClick={() => onThemeClick(id)}>
          {id}
        </ThemeCardButton>
      ))}
    </div>
  )
}
