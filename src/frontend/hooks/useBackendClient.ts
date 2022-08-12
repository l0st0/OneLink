import { createActor as namesActor, canisterId as namesCanister } from '@/names/main'

import { createActor as analyticsActor, canisterId as analyticsCanister } from '@/analytics/main'

import { AuthClient } from '@dfinity/auth-client'

export const useNameClient = async () => {
  const authClient = await AuthClient.create()
  const identity = authClient.getIdentity()

  return namesActor(namesCanister, {
    agentOptions: {
      identity,
    },
  })
}

export const useAnalyticsClient = async () => {
  const authClient = await AuthClient.create()
  const identity = authClient.getIdentity()

  return analyticsActor(analyticsCanister, {
    agentOptions: {
      identity,
    },
  })
}
