import { useNameClient } from '@/hooks'

export const getName = async (name: string) => {
  const client = await useNameClient()
  return await client.getName(name)
}

export const createName = async (name: string) => {
  const client = await useNameClient()
  return await client.createName(name)
}

const nameService = { getName, createName }

export default nameService
