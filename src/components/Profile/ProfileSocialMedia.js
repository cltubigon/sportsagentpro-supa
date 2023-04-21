import { Flex, Text } from '@chakra-ui/react'
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsTiktok } from 'react-icons/bs'

const ProfileSocialMedia = () => {
  return (
    <>
        <Flex gap={4} >
            <Flex alignItems={"center"} gap={1} >
                <BsFacebook/>
                <Text fontSize={"sm"}>3.7k</Text>
            </Flex>
            <Flex alignItems={"center"} gap={1} >
                <BsTwitter/>
                <Text fontSize={"sm"}>3.7k</Text>
            </Flex>
            <Flex alignItems={"center"} gap={1} >
                <BsInstagram/>
                <Text fontSize={"sm"}>3.7k</Text>
            </Flex>
            <Flex alignItems={"center"} gap={1} >
                <BsLinkedin/>
                <Text fontSize={"sm"}>3.7k</Text>
            </Flex>
            <Flex alignItems={"center"} gap={1} >
                <BsTiktok/>
                <Text fontSize={"sm"}>3.7k</Text>
            </Flex>
        </Flex>
    </>
  )
}

export default ProfileSocialMedia
