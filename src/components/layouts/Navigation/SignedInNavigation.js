import { Box, Button, Flex } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaFileContract } from "react-icons/fa"
import SignedInSubMenu from "./SignedInSubMenu"

const SignedInNavigation = ({ setSigningOut }) => {
  console.log("SignedIn Navigation Rendered")

  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <Flex
        gap={10}
        alignItems={"center"}
        flexGrow={1}
        justifyContent={"flex-end"}
      >
        {user && user.userType === "brand" && (
          <Box mr={"auto"}>
            <Link to={"/build"}>
              <Button
                colorScheme="twitter"
                borderRadius={"100px"}
                leftIcon={<FaFileContract />}
              >
                Build
              </Button>
            </Link>
          </Box>
        )}

        <SignedInSubMenu setSigningOut={setSigningOut} />
      </Flex>
    </>
  )
}

export default SignedInNavigation
