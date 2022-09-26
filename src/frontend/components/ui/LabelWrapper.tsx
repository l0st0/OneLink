import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Label } from './Label'

export interface InputWrapperProps {
  label?: string
  id?: string
  className?: string
}

export const LabelWrapper = ({
  children,
  label,
  id,
  className,
}: React.PropsWithChildren<InputWrapperProps>) => (
  <div className={twMerge(clsx('flex w-full flex-col gap-1', className))}>
    {label && <Label htmlFor={id}>{label}</Label>}
    {children}
  </div>
)
