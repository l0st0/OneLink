import { FillButton, Flex, OneLinkIcon, OneLinkTextIcon } from '@/components'
import { TopBarContent } from './styles'

const TopBar = () => {
  return (
    <TopBarContent>
      <Flex alignItems="center" gap="3">
        <OneLinkIcon />
        <OneLinkTextIcon />
      </Flex>

      <FillButton variant="secondary"> Login </FillButton>
    </TopBarContent>
  )
}

export default TopBar
