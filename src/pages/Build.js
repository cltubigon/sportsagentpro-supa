import { useForm } from "react-hook-form"
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { createPost } from "../store/actions/buildPostActions"
import BuildLeftNav from "../components/Build/BuildLeftNav"
import { saveAthletesToStorage } from "../store/actions/athleteActions"
import ActivitiesV1 from "../components/Build/ActivitiesV1"
import RecipientsV1 from "../components/Build/RecipientsV1"
import DetailsV1 from "../components/Build/DetailsV1"
import ReviewV1 from "../components/Build/ReviewV1"
import Paymentv1 from "../components/Build/PaymentV1"
import DealTypeV1 from "../components/Build/DealTypeV1"
import { useNavigate, useParams } from "react-router-dom"

const Build = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const flexRef = useRef(null)
  const { id } = useParams()
  console.log('id: ', id)

  const activeStep = useSelector((state) => state.build.activeStep)
  const isLoggedIn = useSelector((state) => state.auth.profile)

  const [gridHeight, setGridHeight] = useState(null)
  const [gridWidth, setGridWidth] = useState(null)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    if (flexRef.current) {
      setGridHeight(flexRef.current.scrollHeight)
      setGridWidth(flexRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <Flex maxW={"100%"} height={"100vh"}>
        <Box maxW={"290px"}>
          <BuildLeftNav />
        </Box>
        <Flex
          flexGrow={1}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          ref={flexRef}
        >
          {/* <BuildNav /> */}
          {activeStep === "deal_type" && <DealTypeV1 />}
          {activeStep === "recipients" && <RecipientsV1 />}
          {activeStep === "activities" && <ActivitiesV1 />}
          {activeStep === "details" && <DetailsV1 />}
          {activeStep === "review" && <ReviewV1 />}
          {activeStep === "payment" && <Paymentv1 setSpinner={setSpinner} />}
          {spinner && (
            <Flex
              justifyContent={"center"}
              position={"absolute"}
              bgColor={"rgba(255, 255, 255, 0.7)"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={6}
              height={`${gridHeight}px`}
              width={`${gridWidth}px`}
              zIndex={99}
            >
              <Heading>Please wait...</Heading>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Build
