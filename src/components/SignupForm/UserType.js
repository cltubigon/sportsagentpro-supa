import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import React from "react"
import {
  FaRunning,
  FaUsers,
  FaCommentDollar,
  FaRegGrinHearts,
  FaUserTie,
} from "react-icons/fa"
import { Link } from "react-router-dom"

const UserType = ({ userType, setUserType, oneTwoToggle, setOneTwoToggle }) => {
  const typeOfUsers = [
    {
      icon: FaRunning,
      type: "Athlete",
      value: "athlete",
      desc: "Support and manage your athletes.",
      id: 1,
    },
    {
      icon: FaUsers,
      type: "Athlete representative",
      value: "athlete_representative",
      desc: "Support and manage your athletes.",
      id: 2,
    },
    {
      icon: FaCommentDollar,
      type: "Brand",
      value: "brand",
      desc: "Browse and book athletes to promote your business.",
      id: 3,
    },
    {
      icon: FaRegGrinHearts,
      type: "Fan",
      value: "fan",
      desc: "Request shoutouts and more from your favorite athletes.",
      id: 4,
    },
    {
      icon: FaUserTie,
      type: "Coach/staff",
      value: "coach_staff",
      desc: "Share and receive content to engage your audience.",
      id: 5,
    },
  ]

  const selected = {
    bg: "blue.100",
    borderColor: "blue.300",
    boxShadow: "md",
    color: "gray.800",
  }

  const disableButton = {
    pointerEvents: "none",
    opacity: 0.5,
  }
  return (
    <>
      {!oneTwoToggle && (
        <Stack gap={6}>
          <Text fontSize={"3xl"} fontWeight={"semibold"} textAlign={"center"}>
            Select account type
          </Text>
          {typeOfUsers.map((type) => {
            return (
              <Flex
                sx={userType === type.value && selected}
                cursor={"pointer"}
                border={"1px solid #B8BFC5"}
                pr={6}
                py={3}
                key={type.id}
                borderRadius={4}
                onClick={() => setUserType(type.value)}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"64px"}
                >
                  <Icon color={"gray.500"} boxSize={6} as={type.icon} />
                </Flex>
                <Box>
                  <Text fontWeight={"semibold"}>{type.type}</Text>
                  <Text fontSize={"sm"}>{type.desc}</Text>
                </Box>
              </Flex>
            )
          })}
          <Button
            sx={!userType && disableButton}
            colorScheme="twitter"
            onClick={() => setOneTwoToggle((prev) => !prev)}
          >
            Continue
          </Button>
          <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
            <Text>Already have an account?</Text>
            <Link to={"/login"}>
              <Button colorScheme="gray" border={"1px solid #ccc"}>
                Login
              </Button>
            </Link>
          </Flex>
        </Stack>
      )}
    </>
  )
}

export default UserType
