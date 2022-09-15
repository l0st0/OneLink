import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, LoadingButton, Paragraph } from '@/components'
import { useDebounce, useNameClient } from '@/hooks'
import { useAuthStore, useClaimStore, useCreateName, useIsAuthQuery, useUserQuery } from '@/store'
import { Response } from '@/types'
import { NameTextInput } from './components'

interface ClaimFormProps {
  maxWidth?: string
}

export const ClaimForm = ({ maxWidth = '250px' }: ClaimFormProps) => {
  const { input, result, setInput, setResult } = useClaimStore((state) => state)
  const login = useAuthStore((state) => state.login)

  const { isAuth } = useIsAuthQuery()
  const { user } = useUserQuery()
  const { createNameAsync, isLoading } = useCreateName()

  const navigate = useNavigate()

  const debouncedSearchTerm = useDebounce(input)

  const fetchName = async (name: string) => {
    try {
      const nameClient = await useNameClient()
      const { ok, err }: Response<string> = await nameClient.verifyName(name)
      if (err) setResult({ color: 'error', msg: err, claim: false })
      if (ok) setResult({ color: 'success', msg: ok, claim: true })
    } catch (error) {
      setResult({ color: 'error', msg: 'Sorry, something went wrong.', claim: false })
    }
  }

  React.useEffect(() => {
    if (!debouncedSearchTerm) {
      setResult({ color: 'primary', msg: '', claim: false })
      return
    }
    fetchName(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!result.claim) return
    if (!isAuth) return await login(async () => navigate('admin/links'))
    if (!user) return
    if (!user.isVerified || user.hasName) return navigate('admin/links')

    await createNameAsync(debouncedSearchTerm)
    return navigate('admin/links')
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

        <LoadingButton button="outline" loading={isLoading} type="submit">
          Claim
        </LoadingButton>
      </Flex>

      {result.msg && <Paragraph color={result.color}>{result.msg}</Paragraph>}
    </Flex>
  )
}
