/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  GridItem,
  Button,
  Flex,
  Text,
  Input,
  Box,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { BsChevronLeft, BsChevronRight, BsPlus } from "react-icons/bs"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useEffect } from "react"
// import RichEditor from "../../../utils/RichEditor/RichEditor"
import DetailsTitleInputField from "./DetailsTitleInputField"
import {
  SET_ACTIVE_STEP,
  // SET_CONTENT,
  // SET_DETAILS_TAB_STATUS,
  SET_POST_EXPIRATION_DATE,
} from "../../../store/actions/buildPostActions"
import { getTimeToUTCFromLocal } from "../../../utils/DateInputToUTCFromLocal"
import BuildMenu from "../BuildMenu"
import QuillEditor from "../../RichTextEditor/ReactQuill/QuillEditor"

const DetailsV1 = () => {
  console.log('DetailsV1 rendered')
  const dispatch = useDispatch()
  const { register, watch } = useForm()
  // const postContent = useSelector((state) => state.build.postContent)
  // const postTitle = useSelector((state) => state.build.postTitle)
  const postExpirationDate = useSelector(
    (state) => state.build.postExpirationDate
  )

  const availableCharacters = 2000
  const [toggleDate, setToggleDate] = useState(false)

  const handleToggleClick = () => {
    setToggleDate(() => true)
  }

  useEffect(() => {
    const watchedExpiration = watch("expirationDate")
    if (watchedExpiration !== undefined)
      dispatch(SET_POST_EXPIRATION_DATE(watchedExpiration))
  }, [watch("expirationDate")])

  // useEffect(() => {
  //   if (availableCharacters <= 1950 && availableCharacters >= 0 && postTitle) {
  //     dispatch(SET_DETAILS_TAB_STATUS(true))
  //   } else if (availableCharacters !== 2000) {
  //     dispatch(SET_DETAILS_TAB_STATUS(false))
  //   }
  // }, [availableCharacters, postTitle])

  // ------------ RICH TEXT SAVE ------------

  // ------------ RICH TEXT GET ------------

  // useEffect(() => {
  //   if (postContent) {
  //     setRawDataParsed(postContent)
  //     // setRawDataParsed(JSON.parse(postContent))
  //   }
  // }, [])

  // CSS styles --------------
  const borderColorWidthStyle = {
    borderColor: "gray.500",
    borderWidth: "1px",
    borderStyle: "solid",
    my: 2,
  }
  const inputLabelDescriptions = {
    fontSize: "xs",
  }
  const inputLabels = {
    fontWeight: "semibold",
  }
  const borderRadius = "6px"
  const height = "200px"
  return (
    <>
      <Grid
        templateAreas={`"header"
                            "main"
                            "footer"`}
        gridTemplateRows={"auto 9fr auto"}
        gridTemplateColumns={"1fr"}
        h="100vh"
      >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={"header"} pb={4}>
          <BuildMenu />
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem
          px={"80px"}
          py={2}
          area={"main"}
          overflowY={"auto"}
          position={"relative"}
        >
          <DetailsTitleInputField />

          <Box mb={4}>
            <Flex>
              <Text color={"red"}>*</Text>
              <Text sx={inputLabels}>Brief</Text>
            </Flex>
            <Text sx={inputLabelDescriptions} mb={3}>
              Provide a brief background of your business, the purpose of your
              campaign, and clear step-by-step instructions for how complete
              each activity in the deal.
            </Text>

            {/* <RichEditor
              borderColorWidthStyle={borderColorWidthStyle}
              borderRadius={borderRadius}
              height={height}
              setRawDataString={setRawDataString}
              rawDataParsed={rawDataParsed}
              setAvailableCharacters={setAvailableCharacters}
            /> */}
            <QuillEditor />
          </Box>
          <Box mb={4}>
            <Flex gap={1}>
              <Text sx={inputLabels}>Expiration date</Text>
              <Text color={"gray.500"} fontStyle={"italic"}>
                (Optional)
              </Text>
            </Flex>
            <Text sx={inputLabelDescriptions}>
              After this date, the recipient will no longer be able to review or
              accept your deal.
            </Text>
            <Flex alignItems={"center"}>
              {!toggleDate && !postExpirationDate.calendarFormat && (
                <Button
                  mt={2}
                  w={"300px"}
                  leftIcon={<BsPlus fontSize={"24px"} />}
                  borderColor={"blue.600"}
                  borderStyle={"solid"}
                  borderWidth={"1px"}
                  colorScheme="gray"
                  color={"blue.600"}
                  onClick={handleToggleClick}
                >
                  Add deal expiration date
                </Button>
              )}

              {(toggleDate || postExpirationDate.calendarFormat) && (
                <Input
                  maxW={"300px"}
                  sx={borderColorWidthStyle}
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  id="expirationDate"
                  defaultValue={postExpirationDate.calendarFormat}
                  {...register("expirationDate")}
                  min={getTimeToUTCFromLocal()}
                />
              )}
            </Flex>
          </Box>
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"} bottom={"0"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(SET_ACTIVE_STEP("activities"))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme={availableCharacters < 0 ? "gray" : "twitter"}
              onClick={() => dispatch(SET_ACTIVE_STEP("review"))}
            >
              {availableCharacters < 0 ? "Skip step for now" : "Next Step"}
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default DetailsV1
