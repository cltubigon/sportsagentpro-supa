import { useForm } from "react-hook-form"
import { Flex } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { createPost } from "../store/actions/PostActions"
import BuildLeftNav from "../components/Build/BuildLeftNav"
import { saveAthletesToStorage } from "../store/actions/athleteActions"
import ActivitiesV1 from "../components/Build/ActivitiesV1"
import RecipientsV1 from "../components/Build/RecipientsV1"
import DetailsV1 from "../components/Build/DetailsV1"
import ReviewV1 from "../components/Build/ReviewV1"
import Paymentv1 from "../components/Build/PaymentV1"
import DealTypeV1 from "../components/Build/DealTypeV1"

const Build = () => {
  const dispatch = useDispatch()
  const activeStep = useSelector(state => state.post.activeStep)
  const { register, handleSubmit, formState, reset, control } = useForm()
  const { errors, isSubmitSuccessful } = formState

  const onSubmit = (data) => {
    dispatch(createPost(data))
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ team: "", team: "", firstName: "", lastName: "", sports: "" })
    }
  }, [formState, reset])

  return (
    <>
      <Flex maxW={"100%"} height={"100vh"}>
        <BuildLeftNav />
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