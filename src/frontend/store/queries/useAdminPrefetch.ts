import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import service from '../services'
import keys from './keys'

export const useAdminPrefetch = () => {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    queryClient.prefetchQuery([keys.name], service.getName)
    queryClient.prefetchQuery([keys.links], service.getLinks)
    queryClient.prefetchQuery([keys.look], service.getLook)
  }, [])
}
