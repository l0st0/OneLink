import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { About, Link, Look } from '@/types'
import service, { VerifyUserI } from '../services'
import { useAboutStore } from '../stores'

export const queryKeys = {
  isAuth: 'isAuth',
  user: 'user',
  name: 'name',
  nameData: 'nameData',
  links: 'links',
  about: 'about',
  look: 'look',
}

export const useIsAuthQuery = () => {
  const { data: isAuth, ...rest } = useQuery([queryKeys.isAuth], service.getIsAuth, {
    refetchOnMount: true,
  })
  return { isAuth, ...rest }
}

export const useUserQuery = () => {
  const { data: user, ...rest } = useQuery([queryKeys.user], service.getUser, {
    select: (user) => ({
      ...user,
      hasName: !!user?.name,
    }),
  })
  return { user, ...rest }
}

export const useNameQuery = () => {
  const { data: name, ...rest } = useQuery([queryKeys.name], service.getName)
  return { name, ...rest }
}

export const useNameDataQuery = () => {
  const { name } = useNameQuery()
  const n = name?.name || ''
  const { data: nameData, ...rest } = useQuery([queryKeys.nameData], () => service.getNameData(n), {
    enabled: !!n.length,
  })
  return { nameData, ...rest }
}

export const useLinkQuery = () => {
  const { data: links = [], ...rest } = useQuery([queryKeys.links], service.getLinks)
  return { links, ...rest }
}

export const useAboutQuery = () => {
  const { data: about, ...rest } = useQuery([queryKeys.about], service.getAbout, {
    onSuccess: (localAbout) => useAboutStore.setState({ localAbout }),
  })

  return { about, ...rest }
}

export const useLookQuery = () => {
  const { data: look, ...rest } = useQuery([queryKeys.look], service.getLook)

  return { look, ...rest }
}

export const useVerifyUser = () => {
  const queryClient = useQueryClient()
  const {
    mutate: verifyUser,
    mutateAsync: verifyUserAsync,
    ...rest
  } = useMutation(({ principal, token }: VerifyUserI) => service.verifyUser({ principal, token }), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.user])
    },
  })

  return { verifyUser, verifyUserAsync, ...rest }
}

export const useCreateName = () => {
  const queryClient = useQueryClient()
  const {
    mutate: createName,
    mutateAsync: createNameAsync,
    ...rest
  } = useMutation((name: string) => service.createName(name), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.user])
      queryClient.invalidateQueries([queryKeys.name])
      queryClient.invalidateQueries([queryKeys.nameData])
    },
  })

  return { createName, createNameAsync, ...rest }
}

export const useSaveLinks = () => {
  const queryClient = useQueryClient()
  const { mutate: saveLinks, ...rest } = useMutation((links: Link[]) => service.saveLinks(links), {
    onMutate: async (links) => {
      await queryClient.cancelQueries([queryKeys.links])
      const previousLinks = queryClient.getQueryData([queryKeys.links])
      queryClient.setQueryData([queryKeys.links], links)
      return { previousLinks }
    },
    // @ts-ignore
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([queryKeys.links], context?.previousLinks)
    },
    onSettled: async () => {
      queryClient.invalidateQueries([queryKeys.links])
      queryClient.invalidateQueries([queryKeys.nameData])
    },
  })

  return { saveLinks, ...rest }
}

export const useSaveAbout = () => {
  const queryClient = useQueryClient()
  const { mutate: saveAbout, ...rest } = useMutation(async (about: About) => await service.saveAbout(about), {
    onError: () => {
      const localAbout: About | undefined = queryClient.getQueryData([queryKeys.about])
      useAboutStore.setState({ localAbout })
    },
    // @ts-ignore
    onSuccess: async (data, about) => {
      queryClient.setQueryData([queryKeys.about], about)
      queryClient.invalidateQueries([queryKeys.nameData])
    },
  })

  return { saveAbout, ...rest }
}

export const useSaveLook = () => {
  const queryClient = useQueryClient()
  const { mutate: saveLook, ...rest } = useMutation(async (look: Look) => await service.saveLook(look), {
    onMutate: async (look) => {
      await queryClient.cancelQueries([queryKeys.look])
      const previousLook = queryClient.getQueryData([queryKeys.look])
      queryClient.setQueryData([queryKeys.look], look)
      return { previousLook }
    },
    // @ts-ignore
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([queryKeys.look], context?.previousLook)
    },
    // @ts-ignore
    onSettled: async (data, err, look) => {
      queryClient.invalidateQueries([queryKeys.nameData])
    },
  })

  return { saveLook, ...rest }
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { mutate: logout, ...rest } = useMutation(service.logout, {
    onSuccess: () => {
      queryClient.setQueryData([queryKeys.isAuth], false)
      queryClient.setQueryData([queryKeys.user], undefined)
      queryClient.setQueryData([queryKeys.name], undefined)
    },
  })

  return { logout, ...rest }
}
