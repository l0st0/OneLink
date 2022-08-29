import { OneLinkIcon } from '../../icons'
import { Flex } from '../../ui'

export const LoadingData = () => {
  return (
    <Flex direction="column" align="center" gap="6">
      <OneLinkIcon width={40} spin={true} /> <span>Loading data...</span>
    </Flex>
  )
}
