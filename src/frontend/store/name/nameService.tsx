import { useNameClient } from '@/hooks'
import { Link } from '@/types'

export const fetchName = async (name: string) => {
  const client = await useNameClient()
  return await client.getName(name)
}

export const fetchCreateName = async (name: string) => {
  const client = await useNameClient()
  return await client.createName(name)
}

export const fetchUpdateLinks = async (name: string, links: Link[]) => {
  const client = await useNameClient()
  return await client.updateLinks(name, links)
}

const nameService = { fetchName, fetchCreateName, fetchUpdateLinks }

export default nameService
