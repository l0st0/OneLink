import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { About, Link, NameData } from '@/types'
import service from '../services'
import { useAboutStore } from '../stores'

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

export const useNameQuery = () => {
  return useQuery(['name'], () => service.getName())
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
      const previousLinks = queryClient.getQueryData(['links'])
      queryClient.setQueryData(['links'], links)
      return { previousLinks }
    },
    // @ts-ignore
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['links'], context?.previousLinks)
    },
    onSettled: async () => {
      queryClient.invalidateQueries(['links'])
      queryClient.invalidateQueries(['nameData'])
    },
  })
}

export const useAboutQuery = () => {
  return useQuery(['about'], () => service.getAbout(), {
    onSuccess: (localAbout) => useAboutStore.setState({ localAbout }),
  })
}

export const useSaveAbout = () => {
  const queryClient = useQueryClient()

  return useMutation(async (about: About) => await service.saveAbout(about), {
    onError: () => {
      const localAbout: About | undefined = queryClient.getQueryData(['about'])
      useAboutStore.setState({ localAbout })
    },
    // @ts-ignore
    onSuccess: async (data, about) => {
      const nameData: NameData | undefined = queryClient.getQueryData(['nameData'])
      queryClient.setQueryData(['about'], about)
      queryClient.setQueryData(['nameData'], { ...nameData, about })
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
