import { Flex, H1, IcBadgeIconFlat, SubH1 } from '@/components'
import { ClaimForm } from '@/features'

export const Home = () => {
  return (
    <>
      <Flex gap="6" mt="20">
        <H1>You in one</H1>
        <H1 color="black" strokeColor="primary">
          link.
        </H1>
      </Flex>

      <Flex gap="6" mt="2">
        <SubH1>Created on Web3</SubH1> <IcBadgeIconFlat width={256} />
      </Flex>

      <ClaimForm />
    </>
  )
}
