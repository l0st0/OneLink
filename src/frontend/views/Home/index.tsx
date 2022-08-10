import React from 'react'
import { Flex, H1, IcBadgeIconFlat, OutlineButton, Paragraph, SubHeading } from '@/components'
import { NameTextInput } from '@/features'
import { useDebounce } from '@/hooks'
import { names } from '@/names/main'
import { Name, Response } from '@/types'

interface ResultInterface {
  color: 'success' | 'error' | 'primary'
  msg: string
}

const defaultResult: ResultInterface = { color: 'primary', msg: '' }

export const Home = () => {
  const [input, setInput] = React.useState('')
  const [result, setResult] = React.useState<ResultInterface>(defaultResult)

  const debouncedSearchTerm = useDebounce(input, 500)

  const fetchName = async (name: string) => {
    if (name.length < 3)
      return setResult({ color: 'error', msg: 'Sorry, name has to have at least 3 characters.' })

    try {
      const { ok, err }: Response<Name> = await names.getName(name)

      if (ok) setResult({ color: 'error', msg: `Sorry, "${name}" already exists.` })
      if (err) setResult({ color: 'success', msg: `Congratulations, "${name}" is available.` })
    } catch (error) {
      setResult({ color: 'error', msg: 'Sorry, something went wrong.' })
    }
  }

  React.useEffect(() => {
    if (!debouncedSearchTerm) return setResult(defaultResult)
    fetchName(debouncedSearchTerm)
  }, [debouncedSearchTerm])

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

      <Flex gap="4" mt="6" alignItems="center">
        <NameTextInput
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="yourname"
          borderColor={result.color}
        />

        <OutlineButton>Claim</OutlineButton>
      </Flex>

      {result.msg && (
        <Flex mt="3">
          <Paragraph color={result.color}>{result.msg}</Paragraph>
        </Flex>
      )}
    </>
  )
}
