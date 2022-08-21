import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Name } from '@/types'
import service from '../services'

export const useIsAuthQuery = () => {
  return useQuery(['isAuth'], service.getIsAuth, {
    refetchOnMount: true,
  })
}

export const useUserQuery = () => {
  return useQuery(['user'], service.getUser, {
    select: (user) => ({
      ...user,
      hasName: !!user?.name,
    }),
  })
}

export const useNameQuery = <T extends {}>(options?: UseQueryOptions<Name, unknown, T, string[]>) => {
  return useQuery(['name'], () => service.getName(), options)
}

export const useNameDataQuery = (name: string = '') => {
  return useQuery(['nameData'], () => service.getNameData(name), {
    enabled: !!name.length,
  })
}

export const useCreateName = () => {
  const queryClient = useQueryClient()

  return useMutation((name: string) => service.createName(name), {
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      queryClient.invalidateQueries(['name'])
      queryClient.invalidateQueries(['nameData'])
    },
  })
}

export const useLinkQuery = () => {
  return useQuery(['links'], () => service.getLinks())
}

export const useSaveLinks = () => {
  const queryClient = useQueryClient()

  return useMutation((links: Link[]) => service.saveLinks(links), {
    onMutate: async (links) => {
      await queryClient.cancelQueries(['links'])
      queryClient.setQueryData(['links'], links)
      return links
    },
    // @ts-ignore
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['links'], context)
    },
    onSettled: async () => {
      queryClient.invalidateQueries(['links'])
      queryClient.invalidateQueries(['nameData'])
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation(service.logout, {
    onSuccess: () => {
      queryClient.setQueryData(['isAuth'], false)
      queryClient.setQueryData(['user'], undefined)
      queryClient.setQueryData(['name'], undefined)
    },
  })
}
