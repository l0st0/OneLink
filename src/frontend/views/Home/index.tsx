import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, H1, IcBadgeIconFlat, Paragraph, SubHeading, LoadingButton } from '@/components'
import { NameTextInput } from '@/features'
import { useAppDispatch, useDebounce, useIdentity } from '@/hooks'
import { names } from '@/names/main'
import { Name, Response } from '@/types'
import { createName } from '@/store/name/nameSlice'
import { getUser } from '@/store/user/userSlice'

interface ResultInterface {
  color: 'success' | 'error' | 'primary'
  msg: string
  claim: boolean
}

const defaultResult: ResultInterface = { color: 'primary', msg: '', claim: false }

export const Home = () => {
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<ResultInterface>(defaultResult)

  const dispatch = useAppDispatch()

  const debouncedSearchTerm = useDebounce(input, 500)
  const navigate = useNavigate()

  const fetchName = async (name: string) => {
    if (name.length < 3)
      return setResult({
        color: 'error',
        msg: 'Sorry, name has to have at least 3 characters.',
        claim: false,
      })

    try {
      const { ok, err }: Response<Name> = await names.getName(name)

      if (ok) setResult({ color: 'error', msg: `Sorry, "${name}" already exists.`, claim: false })
      if (err) setResult({ color: 'success', msg: `Congratulations, "${name}" is available.`, claim: true })
    } catch (error) {
      setResult({ color: 'error', msg: 'Sorry, something went wrong.', claim: false })
    }
  }

  React.useEffect(() => {
    if (!debouncedSearchTerm) return setResult(defaultResult)
    fetchName(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onClaimClick = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!result.claim) return
    setLoading(true)

    const { ok: actualUser } = await dispatch(getUser()).unwrap()

    if (actualUser) {
      if (!actualUser.hasName) await dispatch(createName(input))

      setLoading(false)
      return navigate('/admin')
    }

    const identity = await useIdentity(dispatch)

    const claimName = async () => {
      const { ok: user } = await dispatch(getUser()).unwrap()
      if (!user?.hasName) await dispatch(createName(input))

      setLoading(false)
      return navigate('/admin')
    }

    identity.login(claimName)
  }

  return (
    <>
      <Flex gap="6" mt="20">
        <H1>You in one</H1>
        <H1 color="black" strokeColor="primary">
          link.
        </H1>
      </Flex>

      <Flex gap="6" mt="2">
        <SubHeading>Created on Web3</SubHeading> <IcBadgeIconFlat width={256} />
      </Flex>

      <Flex as="form" gap="4" mt="6" align="center" onSubmit={onClaimClick}>
        <NameTextInput
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="yourname"
          borderColor={result.color}
        />

        <LoadingButton button="outline" loading={loading} type="submit">
          Claim
        </LoadingButton>
      </Flex>

      {result.msg && (
        <Flex mt="3">
          <Paragraph color={result.color}>{result.msg}</Paragraph>
        </Flex>
      )}
    </>
  )
}
