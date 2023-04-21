import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { VscArrowLeft, VscCopy } from 'react-icons/vsc'
import './ProfileSubNavigation.css'

const ProfileSubNavigation = () => {
  console.log("--------------------------ProfileSubNavigation")
  const [copyLink, setCopyLink] = useState(false)

  const copyLinkButton = () => {
    if (copyLink) {
      clearTimeout(this)
    } else {
      setCopyLink(true)
      navigator.clipboard.writeText(window.location.href);
  
      setTimeout(()=> {
        setCopyLink(false)
      },1000)
    }
  }
  const animateThis = {
    PointerEvent: "none",
    animation: "myAnim 1s ease 0s 2 normal forwards"
  }
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} p={"var(--chakra-space-4)"} >
        <Flex alignItems={"center"}>
        <Icon as={VscArrowLeft}/>
        <Text ml={"5px"} fontWeight={"medium"}>Discover athletes</Text>
        </Flex>
        {copyLink ? <Button sx={copyLink && animateThis} className={copyLink ? "myAnim" : ''} _hover={{bgColor:"transparent"}} variant='solid' >Link copied</Button> :
        <Button onClick={copyLinkButton} leftIcon={<VscCopy />} variant='solid' border={"1px solid gray"}>Share</Button>}
    </Flex>
  )
}

export default ProfileSubNavigation
