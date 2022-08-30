import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '.'
import service from '../services'

export const useAdminPrefetch = () => {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    queryClient.prefetchQuery([queryKeys.name], service.getName)
    queryClient.prefetchQuery([queryKeys.links], service.getLinks)
    queryClient.prefetchQuery([queryKeys.look], service.getLook)
  }, [])
}
