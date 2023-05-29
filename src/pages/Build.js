import { useForm } from "react-hook-form"
import { Box, Flex } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { createPost } from "../store/actions/buildPostActions"
import BuildLeftNav from "../components/Build/BuildLeftNav"
import { saveAthletesToStorage } from "../store/actions/athleteActions"
import ActivitiesV1 from "../components/Build/ActivitiesV1"
import RecipientsV1 from "../components/Build/RecipientsV1"
import DetailsV1 from "../components/Build/DetailsV1"
import ReviewV1 from "../components/Build/ReviewV1"
import Paymentv1 from "../components/Build/PaymentV1"
import DealTypeV1 from "../components/Build/DealTypeV1"
import { useNavigate } from "react-router-dom"

const Build = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activeStep = useSelector(state => state.build.activeStep)
  const isLoggedIn = useSelector((state) => state.auth.profile)

  useEffect(()=> {
    if (!isLoggedIn) {
      navigate('/login')
    }
  },[])

  return (
    <>
      <Flex maxW={"100%"} height={"100vh"}>
        <Box maxW={'290px'}>
          <BuildLeftNav />
        </Box>
        <Flex flexGrow={1} flexDirection={'column'} justifyContent={'flex-start'} >
          {/* <BuildNav /> */}
          {activeStep === 'deal_type' && <DealTypeV1 />}
          {activeStep === 'recipients' && <RecipientsV1 />}
          {activeStep === 'activities' && <ActivitiesV1 />}
          {activeStep === 'details' && <DetailsV1 />}
          {activeStep === 'review' && <ReviewV1 />}
          {activeStep === 'payment' && <Paymentv1 />}
        </Flex>
      </Flex>
    </>
  )
}

export default Build