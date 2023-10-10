import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { BsFillPersonFill } from "react-icons/bs"

const ProfilePictureSection = () => {
  return (
    <Flex>
      <Flex flexDirection={"column"} flexGrow={1} gap={2}>
        <Flex gap={4} alignItems={"center"}>
          <Flex flexDirection={"column"} gap={2}>
            <Icon
              as={BsFillPersonFill}
              color={"gray.400"}
              w={"125px"}
              h={"125px"}
              p={6}
              borderRadius={"125px"}
              shadow={"0px 3px 5px 1px rgba(0, 0, 0, 0.2)"}
            />
          </Flex>
          <Flex flexDirection={"column"} gap={1}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Burnice Bailey
            </Text>
            <Text fontSize={"sm"}>Professional Athlete</Text>
            <Text fontSize={"sm"}>Basketball • AC Connecticut</Text>
          </Flex>
        </Flex>
        <Text w={"120px"} textAlign={"center"} fontSize={'sm'} >
          Edit
        </Text>
      </Flex>
      <Flex>
        <Button>View profile</Button>
        <Button colorScheme="twitter">Save</Button>
      </Flex>
    </Flex>
  )
}

export default ProfilePictureSection
