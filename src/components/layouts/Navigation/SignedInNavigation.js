import { Avatar, AvatarBadge, Flex, Text } from "@chakra-ui/react"
import { connect } from "react-redux"
import { signOut } from "../../../store/actions/authActions"
import { Link } from "react-router-dom"
const SignedInNavigation = ({signOut, initials}) => {
  console.count('rendered nav-signin')
  return (
    <>
      <Flex gap={10} alignItems={"center"}>
        <Text>Deals</Text>
        <Link to="/my-profile"><Text>Profile</Text></Link>
        <Text>Help Center</Text>
        <Text cursor={"pointer"} onClick={signOut
        }>Logout</Text>
        <Avatar name={initials}>
          <AvatarBadge boxSize='0.9em' bg='green.500' />
        </Avatar>
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
  return {
    initials: state.firebase.profile.initials
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignedInNavigation)