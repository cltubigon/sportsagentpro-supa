import { Box, Button, Flex } from '@chakra-ui/react'
import { DummyImage } from 'react-simple-placeholder-image'
import { ProfileGallerySekeleton } from '../Skeleton/Skeletons'

const ProfileGallery = ({athlete}) => {
  console.log("--------------------------Gallery Rendered")
  return (
    <>
      {athlete ?
      <Flex position={"relative"} gap={2} boxSizing='border-box' alignItems={"center"} justifyContent={"space-between"} px={"var(--chakra-space-4)"} >
          <Flex><DummyImage bgColor='#A0AEC0' width={280} height={280} placeholder='280x280' /></Flex>
          <Flex><DummyImage bgColor='#A0AEC0' width={280} height={280} placeholder='280x280' /></Flex>
          <Flex><DummyImage bgColor='#A0AEC0' width={280} height={280} placeholder='280x280' /></Flex>
          <Flex><DummyImage bgColor='#A0AEC0' width={280} height={280} placeholder='280x280' /></Flex>
          <Flex display={{ base: 'none', sm: 'block' }} ><DummyImage bgColor='#A0AEC0' width={280} height={280} placeholder='280x280' /></Flex>
          <Box position={"absolute"} bottom={{base: 2, sm: 3, md: 5, lg: 10}} right={{base: 5, sm: 7, md: 8, lg: 12}} >
            <Button size={{base: 'xs', md: 'md'}} bgColor={"transparent"} border={"1px solid #cdcdcd"} dropShadow={"dark-lg"} _hover={{bgColor:"transparent"}} >View All</Button>
            </Box>
        </Flex>
        :
        <ProfileGallerySekeleton />
      }
    </>
  )
}

export default ProfileGallery
