import { User } from '@/types'

export const LOCAL_II_CANISTER = 'http://qhbym-qaaaa-aaaaa-aaafq-cai.localhost:8000/#authorize'

export const userHasPrimaryName = (user?: User) => !!user?.names.find((n) => n.primary)
