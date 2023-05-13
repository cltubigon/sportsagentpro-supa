import PostTypeNav from "./PostTypeNav"
import { useSelector } from "react-redux"
import RecipientsNav from "./RecipientsNav"
import { Box, Flex } from "@chakra-ui/react"
import ActivitiesNav from "./ActivitiesNav"
import DetailsNav from "./DetailsNav"
import ReviewNav from "./ReviewNav"
import PaymentNav from "./PaymentNav"

const BuildNav = () => {
  const activeStep = useSelector(state => state.post.activeStep)
  
  return (
    <Flex flexDirection={'column'}>
        {activeStep === 'deal_type' && <PostTypeNav />}
        {activeStep === 'recipients' && <RecipientsNav />}
        {activeStep === 'activities' && <ActivitiesNav />}
        {activeStep === 'details' && <DetailsNav />}
        {activeStep === 'review' && <ReviewNav />}
        {activeStep === 'payment' && <PaymentNav />}
    </Flex>
  )
}

export default BuildNav