import { Avatar, Flex, Text } from "@chakra-ui/react"
import { connect } from "react-redux"
import { signOut } from "../../../store/actions/authActions"
const SignedInNavigation = ({signOut}) => {
  return (
    <>
      <Flex gap={10} alignItems={"center"}>
        <Text>Deals</Text>
        <Text>Profile</Text>
        <Text>Help Center</Text>
        <Text cursor={"pointer"} onClick={signOut
        }>Logout</Text>
        <Avatar></Avatar>
      </Flex>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: ()=> dispatch(signOut())
    }
}
const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInNavigation)