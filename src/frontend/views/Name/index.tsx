import { useParams } from 'react-router-dom'
import { NamePage } from '@/features'

export const Name = () => {
  const { name: paramName } = useParams()

  return (
    <div className="h-screen w-full ">
      <NamePage paramName={paramName} />
    </div>
  )
}
