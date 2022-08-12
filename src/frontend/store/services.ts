import { useNameClient } from '@/hooks'
import { Link, Name, Response, User } from '@/types'
import { AuthClient } from '@dfinity/auth-client'

const err = 'Sorry something happened :('

const getUser = async (): Promise<Response<User>> => {
  try {
    const client = await useNameClient()
    return await client.getUser()
  } catch (error) {
    console.log('error', error)
    return { err }
  }
}

const getIsAuth = async (): Promise<Response<boolean>> => {
  try {
    const authClient = await AuthClient.create()
    return { ok: await authClient.isAuthenticated() }
  } catch (error) {
    console.log('error', error)
    return { err }
  }
}

const getName = async (name: string): Promise<Response<Name>> => {
  try {
    const client = await useNameClient()
    return await client.getName(name)
  } catch (error) {
    console.log('error', error)
    return { err }
  }
}

const createName = async (name: string): Promise<Response<{ user: User; name: Name }>> => {
  try {
    const client = await useNameClient()
    return await client.createName(name)
  } catch (error) {
    console.log('error', error)
    return { err }
  }
}

const updateLinks = async (name: string, links: Link[]): Promise<Response<Link[]>> => {
  try {
    const client = await useNameClient()
    return await client.updateLinks(name, links)
  } catch (error) {
    console.log('error', error)
    return { err }
  }
}

const service = { getUser, getIsAuth, getName, createName, updateLinks }

export default service
