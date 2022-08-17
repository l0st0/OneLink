import React from 'react'
import { Flex, LoadingButton, Paragraph } from '@/components'
import { useDebounce, useNameClient } from '@/hooks'
import { Name, Response } from '@/types'
import { NameTextInput } from './components'

interface ResultInterface {
  color: 'success' | 'error' | 'primary'
  msg: string
  claim: boolean
  hasName?: boolean
}

export type onClaimClickParameters = {
  event: React.FormEvent<HTMLDivElement>
  input: string
  result: ResultInterface
  setResult: React.Dispatch<React.SetStateAction<ResultInterface>>
}

interface ClaimFormProps {
  loading: boolean
  onClaimClick: (params: onClaimClickParameters) => void
  maxWidth?: string
}

const defaultResult: ResultInterface = { color: 'primary', msg: '', claim: false }

export const ClaimForm = ({ onClaimClick, loading, maxWidth = '250px' }: ClaimFormProps) => {
  const [input, setInput] = React.useState('')
  const [fetchingName, setFetchingName] = React.useState(false)
  const [result, setResult] = React.useState<ResultInterface>(defaultResult)

  const debouncedSearchTerm = useDebounce(input)

  const fetchName = async (name: string) => {
    if (result.hasName) return

    if (name.length < 3)
      return setResult({
        color: 'error',
        msg: 'Sorry, name has to have at least 3 characters.',
        claim: false,
      })

    try {
      setFetchingName(true)
      const nameClient = await useNameClient()
      const { ok, err }: Response<Name> = await nameClient.getName(name)

      if (ok) setResult({ color: 'error', msg: `Sorry, "${name}" already exists.`, claim: false })
      if (err) setResult({ color: 'success', msg: `Congratulations, "${name}" is available.`, claim: true })
    } catch (error) {
      setResult({ color: 'error', msg: 'Sorry, something went wrong.', claim: false })
    } finally {
      setFetchingName(false)
    }
  }

  React.useEffect(() => {
    if (!debouncedSearchTerm) return setResult(defaultResult)
    fetchName(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    onClaimClick({ event, input, result, setResult })
  }

  return (
    <Flex gap="3" direction="column">
      <Flex as="form" gap="4" mt="6" align="center" onSubmit={onSubmit}>
        <NameTextInput
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="yourname"
          borderColor={result.color}
          maxWidth={maxWidth}
        />

        <LoadingButton button="outline" loading={loading} disabled={fetchingName} type="submit">
          {result.hasName ? 'Admin' : 'Claim'}
        </LoadingButton>
      </Flex>

      {result.msg && <Paragraph color={result.color}>{result.msg}</Paragraph>}
    </Flex>
  )
}
