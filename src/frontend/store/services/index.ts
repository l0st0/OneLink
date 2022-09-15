import { AuthClient } from '@dfinity/auth-client'
import axios from 'axios'
import { useNameClient } from '@/hooks'
import { About, Link, Look, Name, NameData, Response, Stats, User } from '@/types'
import { LOCAL_II_CANISTER } from '@/utils'

export interface VerifyUserI {
  principal: string
  token: string
}

const serverErr = 'Sorry something happened :('

const login = async (onScc?: any) => {
  const authClient = await AuthClient.create()
  const identityProvider = import.meta.env.PROD ? 'https://identity.ic0.app/#authorize' : LOCAL_II_CANISTER
  const maxTimeToLive = BigInt(24 * 60 * 60 * 1000000000)

  await authClient.login({
    onSuccess: async () => onScc && (await onScc()),
    identityProvider,
    maxTimeToLive,
  })
}

const logout = async () => {
  const authClient = await AuthClient.create()
  await authClient.logout()
}

const getIsAuth = async (): Promise<boolean> => {
  try {
    const authClient = await AuthClient.create()
    return await authClient.isAuthenticated()
  } catch (error) {
    throw serverErr
  }
}

export const getStats = async (): Promise<Stats> => {
  try {
    const client = await useNameClient()
    return await client.getStats()
  } catch (error) {
    throw serverErr
  }
}

const getUser = async (): Promise<User> => {
  try {
    const client = await useNameClient()
    const { ok: user, err }: Response<User> = await client.getUser()
    if (!user) throw { err }
    return user
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const verifyUser = async ({ principal, token }: VerifyUserI): Promise<string> => {
  try {
    const client = await useNameClient()

    if (import.meta.env.DEV) {
      const { ok, err }: Response<string> = await client.verifyUser(
        import.meta.env.VITE_CALL_SECRET,
        principal
      )
      if (!ok) throw { err }
      return ok
    }

    await axios.post('https://www.todayweb.net/api/onelink', { id: principal, token })
    return 'Verified'
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const getName = async (): Promise<Name> => {
  try {
    const client = await useNameClient()
    const { ok: name, err }: Response<Name> = await client.getName()
    if (!name) throw { err }
    return name
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const getNameData = async (n: string): Promise<NameData> => {
  try {
    const client = await useNameClient()
    const { ok: data, err }: Response<NameData> = await client.getNameData(n)
    if (!data) throw { err }
    return data
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const createName = async (n: string): Promise<string> => {
  try {
    const client = await useNameClient()
    const { ok, err }: Response<string> = await client.createName(n)
    if (!ok) throw { err }
    return ok
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const getLinks = async (): Promise<Link[]> => {
  try {
    const client = await useNameClient()
    const { ok: links, err }: Response<Link[]> = await client.getLinks()
    if (!links) throw { err }
    return links
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const saveLinks = async (links: Link[]): Promise<string> => {
  try {
    const client = await useNameClient()
    const { ok, err }: Response<string> = await client.saveLinks(links)
    if (!ok) throw { err }
    return ok
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const getAbout = async (): Promise<About> => {
  try {
    const client = await useNameClient()
    const { ok, err }: Response<About> = await client.getAbout()
    if (!ok) throw { err }
    return ok
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const saveAbout = async (about: About): Promise<string> => {
  try {
    const client = await useNameClient()
    const { ok, err }: Response<string> = await client.saveAbout(about)
    if (!ok) throw { err }
    return ok
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const getLook = async (): Promise<Look> => {
  try {
    const client = await useNameClient()
    const { ok, err }: Response<Look> = await client.getLook()
    if (!ok) throw { err }
    return ok
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const saveLook = async (look: Look): Promise<string> => {
  try {
    const client = await useNameClient()
    const { ok, err }: Response<string> = await client.saveLook(look)
    if (!ok) throw { err }
    return ok
  } catch ({ err }) {
    if (err) throw err
    throw serverErr
  }
}

const service = {
  login,
  logout,
  getUser,
  getIsAuth,
  getName,
  getNameData,
  createName,
  getLinks,
  saveLinks,
  saveAbout,
  getAbout,
  getLook,
  saveLook,
  verifyUser,
}

export default service
