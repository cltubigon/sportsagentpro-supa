import PostTypeNav from "./PostTypeNav"
import { useSelector } from "react-redux"
import RecipientsNav from "./RecipientsNav"
import { Box, Flex } from "@chakra-ui/react"

const BuildNav = () => {
  const activeStep = useSelector(state => state.post.activeStep)
  
  return (
    <Flex flexDirection={'column'}>
        {activeStep === 'deal_type' && <PostTypeNav />}
        {activeStep === 'recipients' && <RecipientsNav />}
    </Flex>
  )
}

export default BuildNav
