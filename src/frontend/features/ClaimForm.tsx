import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { LoadingButton } from '@/components'
import { useDebounce, useNameClient } from '@/hooks'
import { useAuthStore, useClaimStore, useCreateName, useIsAuthQuery, useUserQuery } from '@/store'
import { Response } from '@/types'

export type BorderColorTypes = 'primary' | 'error' | 'success'

export const ClaimForm = () => {
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
      if (err) setResult({ msg: err, claim: false })
      if (ok) setResult({ msg: ok, claim: true })
    } catch (error) {
      setResult({ msg: 'Sorry, something went wrong.', claim: false })
    }
  }

  React.useEffect(() => {
    if (!debouncedSearchTerm) {
      setResult({ msg: '', claim: false })
      return
    }
    fetchName(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!result.claim) return
    if (!isAuth) return await login(async () => navigate('admin/links'))
    if (!user) return
    if (!user.isVerified || user.hasName) return navigate('admin/links')

    await createNameAsync(debouncedSearchTerm)
    return navigate('admin/links')
  }

  const borderColor: BorderColorTypes = !result.msg.length ? 'primary' : !result.claim ? 'error' : 'success'

  return (
    <div className="flex flex-col gap-3">
      <form className="flex items-center gap-4" onSubmit={onSubmit}>
        <div
          className={clsx(
            'flex items-center rounded-primary bg-white p-4 transition-all ease-in',
            'focus-within:ring-2 focus-within:ring-offset-4 focus-within:ring-offset-black',
            {
              'focus-within:ring-primary': borderColor === 'primary',
              'ring-2 ring-offset-4 ring-offset-black': borderColor === 'success' || borderColor === 'error',
              'ring-success': borderColor === 'success',
              'ring-error': borderColor === 'error',
            }
          )}
        >
          <p className="cursor-default text-black">onelink.ooo/</p>
          <input
            className="p-0 text-black"
            autoFocus
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="yourname"
          />
        </div>

        <LoadingButton button="outline" loading={isLoading} type="submit">
          Claim
        </LoadingButton>
      </form>

      {result.msg && <p className={clsx(result.claim ? 'text-success' : 'text-error')}>{result.msg}</p>}
    </div>
  )
}
