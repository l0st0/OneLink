import { AuthClient } from '@dfinity/auth-client'
import { useNameClient } from '@/hooks'
import { Link, Name, Profile, Response, User } from '@/types'

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

const getIsAuth = async (): Promise<boolean> => {
  try {
    const authClient = await AuthClient.create()
    return await authClient.isAuthenticated()
  } catch (error) {
    console.log('error', error)
    return false
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

const updateProfile = async (name: string, profile: Profile): Promise<Response<Profile>> => {
  try {
    const client = await useNameClient()
    return await client.updateProfile(name, profile)
  } catch (error) {
    console.log('error', error)
    return { err }
  }
}

const service = { getUser, getIsAuth, getName, createName, updateLinks, updateProfile }

export default service
