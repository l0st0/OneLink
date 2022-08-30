import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { About, Link, Look } from '@/types'
import service from '../services'
import { useAboutStore } from '../stores'
import keys from './keys'

export const useIsAuthQuery = () => {
  return useQuery([keys.isAuth], service.getIsAuth, {
    refetchOnMount: true,
  })
}

export const useUserQuery = () => {
  return useQuery([keys.user], service.getUser, {
    select: (user) => ({
      ...user,
      hasName: !!user?.name,
    }),
  })
}

export const useNameQuery = () => {
  return useQuery([keys.name], service.getName)
}

export const useNameDataQuery = () => {
  const { data } = useNameQuery()
  const name = data?.name || ''

  return useQuery([keys.nameData], () => service.getNameData(name), {
    enabled: !!name.length,
  })
}

export const useCreateName = () => {
  const queryClient = useQueryClient()

  return useMutation((name: string) => service.createName(name), {
    onSuccess: () => {
      queryClient.invalidateQueries([keys.user])
      queryClient.invalidateQueries([keys.name])
      queryClient.invalidateQueries([keys.nameData])
    },
  })
}

export const useLinkQuery = () => {
  const { data: links = [], ...rest } = useQuery([keys.links], service.getLinks)
  return { links, ...rest }
}

export const useSaveLinks = () => {
  const queryClient = useQueryClient()

  return useMutation((links: Link[]) => service.saveLinks(links), {
    onMutate: async (links) => {
      await queryClient.cancelQueries([keys.links])
      const previousLinks = queryClient.getQueryData([keys.links])
      queryClient.setQueryData([keys.links], links)
      return { previousLinks }
    },
    // @ts-ignore
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([keys.links], context?.previousLinks)
    },
    onSettled: async () => {
      queryClient.invalidateQueries([keys.links])
      queryClient.invalidateQueries([keys.nameData])
    },
  })
}

export const useAboutQuery = () => {
  return useQuery([keys.about], service.getAbout, {
    onSuccess: (localAbout) => useAboutStore.setState({ localAbout }),
  })
}

export const useSaveAbout = () => {
  const queryClient = useQueryClient()

  return useMutation(async (about: About) => await service.saveAbout(about), {
    onError: () => {
      const localAbout: About | undefined = queryClient.getQueryData([keys.about])
      useAboutStore.setState({ localAbout })
    },
    // @ts-ignore
    onSuccess: async (data, about) => {
      queryClient.setQueryData([keys.about], about)
      queryClient.invalidateQueries([keys.nameData])
    },
  })
}

export const useLookQuery = () => {
  return useQuery([keys.look], service.getLook)
}

export const useSaveLook = () => {
  const queryClient = useQueryClient()

  return useMutation(async (look: Look) => await service.saveLook(look), {
    onMutate: async (look) => {
      await queryClient.cancelQueries([keys.look])
      const previousLook = queryClient.getQueryData([keys.look])
      queryClient.setQueryData([keys.look], look)
      return { previousLook }
    },
    // @ts-ignore
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([keys.look], context?.previousLook)
    },
    // @ts-ignore
    onSettled: async (data, err, look) => {
      queryClient.invalidateQueries([keys.nameData])
      queryClient.invalidateQueries([keys.look])
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation(service.logout, {
    onSuccess: () => {
      queryClient.setQueryData(['isAuth'], false)
      queryClient.setQueryData([keys.user], undefined)
      queryClient.setQueryData([keys.name], undefined)
    },
  })
}
