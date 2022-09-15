import create from 'zustand'

interface ResultInterface {
  msg: string
  claim: boolean
}

interface ClaimState {
  input: string
  result: ResultInterface
  setInput: (input: string) => string
  setResult: (result: ResultInterface) => ResultInterface
}

export const useClaimStore = create<ClaimState>((set) => ({
  input: '',
  result: { color: 'primary', msg: '', claim: false },

  setInput: (input) => {
    set({ input })
    return input
  },
  setResult: (result) => {
    set({ result })
    return result
  },
}))
