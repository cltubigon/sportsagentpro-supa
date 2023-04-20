import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { VscArrowLeft, VscCopy } from 'react-icons/vsc'

const ProfileSubNavigation = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} p={"var(--chakra-space-4)"} >
        <Flex alignItems={"center"}>
        <Icon as={VscArrowLeft}/>
        <Text ml={"5px"} fontWeight={"medium"}>Discover athletes</Text>
        </Flex>
        <Button leftIcon={<VscCopy />} variant='solid' border={"1px solid gray"}>Share</Button>
    </Flex>
  )
}

export default ProfileSubNavigation
