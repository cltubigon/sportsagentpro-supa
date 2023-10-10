import { Flex, Text } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

const ProfileAthleteSubMenu = () => {
  const location = useLocation()
  const menuStyling = {
    minW: "120px",
    textAlign: "center",
    pb: 2,
    fontWeight: "medium",
    color: "gray.600",
    cursor: "pointer",
    _hover: {
      borderBottom: "2px",
      borderColor: "black",
      borderStyle: "solid",
    },
  }
  const isProfile = location.pathname === "/profile"
  const isAccount = location.pathname === "/account"
  const isPayments = location.pathname === "/profile"
  console.log({ isProfile, isAccount, isPayments })
  return (
    <Flex>
      <Text
        sx={menuStyling}
        borderBottom={isProfile ? "2px solid black" : "2px solid transparent"}
      >
        Profile
      </Text>
      <Text
        sx={menuStyling}
        borderColor={isAccount ? "2px solid black" : "2px solid transparent"}
      >
        Account
      </Text>
      <Text
        sx={menuStyling}
        borderColor={isPayments ? "2px solid black" : "2px solid transparent"}
      >
        Payments
      </Text>
    </Flex>
  )
}

export default ProfileAthleteSubMenu
