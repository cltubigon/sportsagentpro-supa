import { Divider, Flex, Icon, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io"
import ShareProfile from "./ShareProfile"
import AthleteLevelSkeleton from "./Skeleton/AthleteLevelSkeleton"

const ProfileAthleteRightContent = ({ data }) => {
  const [athleteLevel, setathleteLevel] = useState(null)
  const [description, setDescription] = useState("")
  const [hideTasks, setHideTasks] = useState(true)
  const bio = Boolean(data && data[0]?.bio)
  const profilePicture = Boolean(
    data && data[0]?.images && data[0]?.images[0]?.profile_picture
  )
  const featuredPhotos = Boolean(
    data && data[0]?.images && data[0]?.images[0]?.gallery?.length > 4
  )
  const languageAndEthnicity = Boolean(
    data && data[0]?.ethnicity?.length > 0 && data[0]?.language?.length > 0
  )
  const interestsAndIdentifiers = Boolean(
    data && data[0]?.identifiers_interests?.length > 0
  )
  const locations = Boolean(
    data && data[0]?.hometown && data[0]?.current_location
  )
  const basicInfo = Boolean(
    data &&
      data[0]?.which_best_describes_you &&
      data[0]?.gender_identity &&
      data[0]?.sport?.length > 0 &&
      data[0]?.current_team?.length > 0
  )
  const isCompleteAthleteProfile = Boolean(
    bio &&
      profilePicture &&
      featuredPhotos &&
      interestsAndIdentifiers &&
      locations &&
      basicInfo
  )

  const tasks = [
    { label: "Write a short bio", value: bio },
    { label: "Add a profile picture", value: profilePicture },
    { label: "Add featured photos", value: featuredPhotos },
    { label: "Include your language & ethnicity", value: languageAndEthnicity },
    {
      label: "Include your interests & identifiers",
      value: interestsAndIdentifiers,
    },
    { label: "Add your locations", value: locations },
    { label: "Finish adding your basic info", value: basicInfo },
    { label: "Complete your athlete profile", value: isCompleteAthleteProfile },
  ]

  const completedTasks = tasks.filter((val) => val.value === true)
  const numberOfCompletedTasks = completedTasks?.length

  useEffect(() => {
    console.log("external", data, numberOfCompletedTasks)
    if (data && numberOfCompletedTasks > 0) {
      console.log("entered if else statement")
      if (numberOfCompletedTasks === 10) {
        setathleteLevel("ALL STAR")
      } else if (numberOfCompletedTasks > 7) {
        setathleteLevel("PLAYMAKER")
        setDescription(
          `Complete ${
            10 - numberOfCompletedTasks
          } more tasks to level up to All star`
        )
      } else if (numberOfCompletedTasks > 3) {
        setathleteLevel("STARTER")
        setDescription(
          `Complete ${
            8 - numberOfCompletedTasks
          } more tasks to level up to Playmaker`
        )
      } else if (numberOfCompletedTasks <= 3) {
        setathleteLevel("ROOKIE")
        setDescription(
          `Complete ${
            4 - numberOfCompletedTasks
          } more tasks to level up to Starter`
        )
      }
    }
  }, [numberOfCompletedTasks, data])

  console.log({
    data,
    athleteLevel,
    numberOfCompletedTasks,
  })

  const handleHideTasks = () => {
    setHideTasks((prev) => !prev)
  }
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
        position={"relative"}
      >
        {(!data || !athleteLevel || numberOfCompletedTasks?.length === 0) && (
          <Flex
            position={"absolute"}
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
            bgColor={"rgba(255, 255, 255, 0.95)"}
            borderRadius={"lg"}
            zIndex={10}
          >
            <AthleteLevelSkeleton />
            {/* <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            /> */}
          </Flex>
        )}
        <Flex flexDirection={"column"} gap={1}>
          <Text fontSize={"sm"}>Profile Strength</Text>
          <Text fontSize={"xl"} color={"#1DA1F2"} letterSpacing={"1px"}>
            {athleteLevel}
          </Text>
          <Text fontSize={"xs"}>{description}</Text>
          <Divider
            h={"8px"}
            mt={1}
            zIndex={1}
            bgColor={"#1DA1F2"}
            w={`${numberOfCompletedTasks}0%`}
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
          {tasks
            .filter((task) => task.value === false)
            .map((task, index) => {
              return (
                index < 3 && (
                  <Flex gap={2} alignItems={"center"} key={index}>
                    <Icon as={IoIosRadioButtonOff} boxSize={5} />
                    <Text>{task.label}</Text>
                  </Flex>
                )
              )
            })}
        </Flex>
        <Flex flexDirection={"column"} gap={3}>
          <Text
            onClick={handleHideTasks}
            cursor={"default"}
            w={"fit-content"}
            color={"#1DA1F2"}
            fontWeight={"semibold"}
          >
            See all tasks
          </Text>

          {!hideTasks && (
            <Flex flexDirection={"column"} gap={5}>
              {tasks
                .filter((task) => task.value === false)
                .map((task, index) => {
                  return (
                    index >= 3 && (
                      <Flex gap={2} alignItems={"center"} key={index}>
                        <Icon as={IoIosRadioButtonOff} boxSize={5} />
                        <Text>{task.label}</Text>
                      </Flex>
                    )
                  )
                })}
              <Text color={"#1DA1F2"} fontWeight={"semibold"}>
                Completed Tasks
              </Text>
              {tasks
                .filter((task) => task.value === true)
                .map((task, index) => {
                  return (
                    <Flex gap={2} alignItems={"center"} key={index}>
                      <Icon
                        as={IoIosRadioButtonOn}
                        color={"#1DA1F2"}
                        boxSize={5}
                      />
                      <Text>{task.label}</Text>
                    </Flex>
                  )
                })}
              <Flex gap={2} alignItems={"center"}>
                <Icon as={IoIosRadioButtonOn} color={"#1DA1F2"} boxSize={5} />
                <Text>Add your email and phone number</Text>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Divider w={"100%"} />
        <Flex>
          <Text fontSize={"sm"}>
            Once you reach All-Star strength, you'll earn a profile badge that
            brands and fans can see.
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