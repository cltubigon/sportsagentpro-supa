import { useForm } from "react-hook-form"
import { Flex, Box } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { createPost } from "../store/actions/buildPostActions"
import PostType from "../components/Build/PostType"
import BuildNav from "../components/Build/BuildNav"
import BuildLeftNav from "../components/Build/BuildLeftNav"
import Receipients from "../components/Build/Recipients"
import Activities from "../components/Build/Activities"
import Details from "../components/Build/Details"
import Review from "../components/Build/Review"
import Payment from "../components/Build/Payment"
import { saveAthletesToStorage } from "../store/actions/athleteActions"

const Build = () => {
  const dispatch = useDispatch()
  const activeStep = useSelector(state => state.build.activeStep)
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
          <BuildNav />
          {activeStep === 'deal_type' && <PostType />}
          {activeStep === 'recipients' && <Receipients />}
          {activeStep === 'activities' && <Activities />}
          {activeStep === 'details' && <Details />}
          {activeStep === 'review' && <Review />}
          {activeStep === 'payment' && <Payment />}
        </Flex>
      </Flex>
    </>
  )
}

export default Build