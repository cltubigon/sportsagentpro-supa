import { Flex, Heading, Spinner } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import BuildLeftNav from "../components/Build/BuildLeftNav"
import ActivitiesV1 from "../components/Build/ActivitiesV1"
import RecipientsV1 from "../components/Build/RecipientsV1"
import ReviewV1 from "../components/Build/ReviewV1"
import Paymentv1 from "../components/Build/PaymentV1"
import DealTypeV1 from "../components/Build/DealTypeV1"
import { motion } from "framer-motion"
import DetailsV1 from "../components/Build/Details/DetailsV1"

const Build = () => {
  const flexRef = useRef(null)

  const activeStep = useSelector((state) => state.build.activeStep)
  const isSubmitting = useSelector((state) => state.build.isSubmitting)

  const [gridHeight, setGridHeight] = useState(null)
  const [gridWidth, setGridWidth] = useState(null)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    if (flexRef.current) {
      setGridHeight(flexRef.current.scrollHeight)
      setGridWidth(flexRef.current.offsetWidth)
    }
  }, [])
  console.log('isSubmitting: ', isSubmitting)

  useEffect(() => {
    if (isSubmitting) {
      setSpinner(true)
    } else {
      setSpinner(false)
    }
  }, [isSubmitting])

  const [collapse, setCollapse] = useState(false)
  const leftNav = {
    initialWidth: {
      minWidth: "290px",
      maxWidth: "290px",
    },
    fullWidth: {
      width: "100%",
      minWidth: "290px",
      maxWidth: "290px",
      transition: {
        duration: 0.3,
      },
    },
    minimizedWidth: {
      width: "100%",
      minWidth: "80px",
      maxWidth: "80px",
      transition: {
        duration: 0.3,
      },
    },
  }
  return (
    <>
      <Flex maxW={"100%"} height={"100vh"}>
        <Flex
          as={motion.div}
          variants={leftNav}
          initial={"initialWidth"}
          animate={collapse ? "minimizedWidth" : "fullWidth"}
        >
          <BuildLeftNav
            setSpinner={setSpinner}
            setCollapse={setCollapse}
            collapse={collapse}
          />
        </Flex>
        <Flex
          flexGrow={1}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          ref={flexRef}
        >
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
