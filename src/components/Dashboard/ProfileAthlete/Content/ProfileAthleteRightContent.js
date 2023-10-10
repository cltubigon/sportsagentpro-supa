import { Divider, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { IoIosRadioButtonOff } from "react-icons/io"
import ShareProfile from "./ShareProfile"

const ProfileAthleteRightContent = () => {
  return (
    <Flex flexDirection={"column"} gap={6}>
      <Flex
        w={"305px"}
        flexDirection={"column"}
        borderRadius={"lg"}
        borderColor={"blue.300"}
        borderStyle={"solid"}
        borderWidth={"1px"}
        px={3}
        py={3}
        gap={4}
      >
        <Flex flexDirection={"column"} gap={1}>
          <Text fontSize={"sm"}>Profile Strength</Text>
          <Text fontSize={"xl"} color={"#1DA1F2"}>
            ROOKIE
          </Text>
          <Text fontSize={"sm"}>
            Complete 3 more tasks to level up to Starter
          </Text>
          <Divider
            h={"8px"}
            mt={1}
            zIndex={1}
            bgColor={"#1DA1F2"}
            w={"10%"}
            borderRadius={"10px"}
          />
          <Divider
            h={"8px"}
            mt={"-13px"}
            bgColor={"gray.400"}
            w={"100%"}
            borderRadius={"10px"}
          />
        </Flex>
        <Flex flexDirection={"column"} gap={5}>
          <Flex gap={2} alignItems={"center"}>
            <Icon as={IoIosRadioButtonOff} boxSize={5} />
            <Text>Add a profile picture</Text>
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Icon as={IoIosRadioButtonOff} boxSize={5} />
            <Text>Finish adding your basic info</Text>
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Icon as={IoIosRadioButtonOff} boxSize={5} />
            <Text>Connect an Instagram channel</Text>
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Icon as={IoIosRadioButtonOff} boxSize={5} />
            <Text>Add your locations</Text>
          </Flex>
        </Flex>
        <Flex>
          <Text color={"#1DA1F2"} fontWeight={"semibold"}>
            See all tasks
          </Text>
        </Flex>
        <Divider w={"100%"} />
        <Flex>
          <Text fontSize={'sm'}>
            Once you reach All-Star strength, you'll earn a profile badge that brands and fans can see.
          </Text>
        </Flex>
      </Flex>

      <Flex
        w={"305px"}
        flexDirection={"column"}
        borderRadius={"lg"}
        borderColor={"blue.300"}
        borderStyle={"solid"}
        borderWidth={"1px"}
        px={3}
        py={3}
        gap={4}
      >
        <Flex flexDirection={"column"} gap={1}>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            Share your profile
          </Text>
          <Text fontSize={"xs"}>
            Paste this link into your social media bios or link trees to help
            others discover you for opportunities. Anyone can view your profile
            by accessing this link.
          </Text>
        </Flex>
        <ShareProfile />
      </Flex>
    </Flex>
  )
}

export default ProfileAthleteRightContent
