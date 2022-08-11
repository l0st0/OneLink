import { useAppSelector } from '@/hooks'

export const Admin = () => {
  const { name } = useAppSelector((state) => state.name)
  return <div>{name?.name}</div>
}
