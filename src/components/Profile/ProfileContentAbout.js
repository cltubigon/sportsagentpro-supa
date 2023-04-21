import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { RiFolderUserLine, RiMedalLine } from 'react-icons/ri'
import { GiGreekTemple, GiHouse } from 'react-icons/gi'
import { CiLocationOn } from 'react-icons/ci'

const ProfileContentAbout = () => {
  return (
    <>
        <Flex borderTop={"1px solid #DCE1E6"} pt={5}>
            <Text fontSize={"xl"} fontWeight={"semibold"} >About</Text>
        </Flex>

        <Flex gap={4}>
            <Icon as={BsFillPersonVcardFill} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
            <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>Biography</Text>
                <Text fontSize={"sm"}>Liberal studies College graduate , seeking double major student athlete super senior ready to experience another great year as a Tiger https://fanarch.com/collections/deandre-williams</Text>
            </Box>
        </Flex>

        <Flex gap={4}>
            <Icon as={GiGreekTemple} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
            <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>Affiliations</Text>
                <Text fontSize={"sm"}>Memphis Tigers • AAC • NCAA</Text>
            </Box>
        </Flex>

        <Flex gap={4}>
            <Icon as={RiMedalLine} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
            <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>Accolades</Text>
                <Text fontSize={"sm"}>Collegiate All-Conference • Collegiate Player of the week</Text>
            </Box>
        </Flex>

        <Flex gap={4}>
            <Icon as={CiLocationOn} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
            <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>Location</Text>
                <Text fontSize={"sm"}>Memphis, TN, USA</Text>
            </Box>
        </Flex>

        <Flex gap={4}>
            <Icon as={RiFolderUserLine} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
            <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>Background</Text>
                <Text fontSize={"sm"}>Student athlete • Male • African American • 26 • English</Text>
            </Box>
        </Flex>

        <Flex gap={4} >
            <Icon as={GiHouse} boxSize={"24px"} color={"gray.400"} mt={"4px"} />
            <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>Hometown</Text>
                <Text fontSize={"sm"}>Houston, TX, USA</Text>
            </Box>
        </Flex>
    </>
  )
}

export default ProfileContentAbout