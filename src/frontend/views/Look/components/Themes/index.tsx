import React from 'react'
import clsx from 'clsx'

interface ThemesProps {
  theme: string
  onThemeClick: (theme: string) => void
}

interface ThemeCardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
}

const themes = [{ id: 'black' }, { id: 'white' }, { id: 'orange' }]

const ThemeCardButton = ({ children, active, ...rest }: React.PropsWithChildren<ThemeCardButtonProps>) => (
  <button
    {...rest}
    className={clsx(
      'flex h-[200px] w-full cursor-pointer flex-col items-center rounded-primary bg-transparent text-white',
      'border border-dashed border-white',
      'hover:ring hover:ring-primary hover:ring-offset-4 hover:ring-offset-black',
      active ? 'ring ring-primary ring-offset-4 ring-offset-black' : 'ring-0'
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
