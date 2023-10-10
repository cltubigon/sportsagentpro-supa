import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SUPABASE_SIGNOUT } from "../../../store/actions/authActions"
import { Avatar, AvatarBadge, Flex, Icon, Text } from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { useEffect } from "react"

const SignedInSubMenu = ({ setSigningOut }) => {
  const dispatch = useDispatch()
  const [profileSubMenu, setprofileSubMenu] = useState(false)
  const containerRef = useRef(null)

  const user = useSelector((state) => state.auth.user)

  const handleProfileSubMenuClick = () => {
    setprofileSubMenu((prev) => !prev)
  }

  const handleSignOut = () => {
    dispatch(SUPABASE_SIGNOUT())
    setSigningOut(true)
  }
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setprofileSubMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  return (
    <Flex
      alignItems={"center"}
      gap={4}
      onClick={handleProfileSubMenuClick}
      userSelect={"none"}
      ref={containerRef}
    >
      <Avatar
        name={user && `${user.firstName[0]} ${user.lastName[0]}`}
        cursor={"pointer"}
      >
        <AvatarBadge boxSize="0.9em" bg="green.500" />
      </Avatar>
      <Flex gap={2} alignItems={"center"} position={"relative"}>
        <Text cursor={"pointer"}>{user.firstName} {user.lastName}</Text>
        <Icon as={FiChevronDown} cursor={"pointer"} />
        {profileSubMenu && (
          <Flex
            position={"absolute"}
            flexDirection={"column"}
            gap={3}
            px={4}
            py={2}
            borderRadius={"sm"}
            boxShadow={"0px 0px 5px 3px rgba(0, 0, 0, 0.15);"}
            zIndex={1005}
            top={"56px"}
            right={"0"}
            w={"180px"}
            color={"black"}
            bgColor={"white"}
          >
            <Link to={"/profile"}>
              <Text>Profile</Text>
            </Link>
            <Text>Account</Text>
            <Text>Payments</Text>
            <Text>Education</Text>
            <Text>Help center</Text>
            <Text cursor={"pointer"} onClick={handleSignOut}>
              Logout
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default SignedInSubMenu
