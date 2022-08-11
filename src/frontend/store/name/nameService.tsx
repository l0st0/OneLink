import { useNameClient } from '@/hooks'

export const fetchName = async (name: string) => {
  const client = await useNameClient()
  return await client.getName(name)
}

export const fetchCreateName = async (name: string) => {
  const client = await useNameClient()
  return await client.createName(name)
}

const nameService = { fetchName, fetchCreateName }

export default nameService
