import { Flex, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { BsCheckCircle } from 'react-icons/bs'

const ProfileContentInterests = () => {
  return (
    <>
    <Stack borderTop={"1px solid #DCE1E6"} pt={"20px"}>
            <Text fontSize={"xl"} fontWeight={"semibold"} >About</Text>
            <SimpleGrid minChildWidth={"40%"} gap={2}>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Fitness</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Entertainment</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Business & finance</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Movies & TV</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Food</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Careers</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Gaming</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Music</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>NFTs</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Technology</Text>
                </Flex>
                <Flex alignItems={"center"} gap={2} >
                    <Icon as={BsCheckCircle} color={"gray.300"} />
                    <Text fontSize={"sm"}>Travel</Text>
                </Flex>
            </SimpleGrid>
        </Stack>
    </>
  )
}

export default ProfileContentInterests
