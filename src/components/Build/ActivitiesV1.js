/* eslint-disable react-hooks/exhaustive-deps */
import { SearchIcon } from "@chakra-ui/icons"
import {
  Text,
  Flex,
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  SET_ACTIVE_STEP,
  UPDATE_SELECTED_ACTIVITIES,
  ADD_OR_REMOVE_ACTIVITIES,
  SET_ACTIVITY_TAB_STATUS,
  SET_ACTIVITIES_LIST_LAYOUT,
} from "../../store/actions/buildPostActions"
import { getTimeToUTCFromLocal } from "../../utils/DateInputToUTCFromLocal"
import { motion } from "framer-motion"
import {
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
  BsCurrencyDollar,
  BsExclamationCircleFill,
} from "react-icons/bs"
import { TfiMenuAlt } from "react-icons/tfi"
import { RxDashboard } from "react-icons/rx"
import {
  BiTrash,
  BiChevronUp,
} from "react-icons/bi"
import { useForm } from "react-hook-form"
import BuildMenu from "./BuildMenu"
import {activityList as activities} from "./activityList"

const ActivitiesNav1 = () => {
  const dispatch = useDispatch()
  const activitiesListLayout = useSelector((state) => state.build.activitiesListLayout)
  const activitiesTabReady = useSelector((state) => state.build.activitiesTabReady)
  const selectedActivities = useSelector((state) => state.build.selectedActivities)

  const { register, watch } = useForm()
  const watchSearch = watch("searchActivity")

  const reduxSelectedActivity = selectedActivities

  const [count, setCount] = useState(null)
  const [tab, setTab] = useState(true)
  const [inputs, setInputs] = useState({})

  const handleListTrue = () => {
    dispatch(SET_ACTIVITIES_LIST_LAYOUT(true))
  }
  const handleListFalse = () => {
    dispatch(SET_ACTIVITIES_LIST_LAYOUT(false))
  }

  useEffect(() => {
    const allAmountsAreReady =
      reduxSelectedActivity &&
      !reduxSelectedActivity.some(
        (activity) =>
          activity.activityAmount === "" ||
          activity.activityAmount < 1 ||
          activity.activityAmount === undefined
      )
    const allDatesAreReady =
      reduxSelectedActivity &&
      !reduxSelectedActivity.some(
        (activity) =>
          activity.activityDate === "" || activity.activityDate === undefined
      )
    const activityTabStatus =
      reduxSelectedActivity &&
      reduxSelectedActivity.length > 0 &&
      allAmountsAreReady &&
      allDatesAreReady &&
      allAmountsAreReady === allDatesAreReady
    console.log('this part is triggered')
    dispatch(SET_ACTIVITY_TAB_STATUS(activityTabStatus))
  }, [reduxSelectedActivity, tab])

  const [activeActivity, setActiveActivity] = useState([])
  const handleActiveActivityClick = (id) => {
    const check =
      activeActivity && !activeActivity.some((data) => data.id === id)
    const filteredActivity = activeActivity.filter((data) => data.id !== id)
    check
      ? setActiveActivity([...activeActivity, { id: id }])
      : setActiveActivity(filteredActivity)
  }

  const activeChecker = (activity) => {
    const isActive = activeActivity.some((data) => data.id === activity.id)
    return isActive
  }

  useEffect(() => {
    if (reduxSelectedActivity && (reduxSelectedActivity.length !== count)) {
      setCount(reduxSelectedActivity.length)
    }

    const selectedActivityIds = reduxSelectedActivity && reduxSelectedActivity.map(
      (activity) => activity.id
    )
    const notSelectedKeys = Object.keys(inputs).filter(
      (keys) =>
        !selectedActivityIds.some(
          (id) => keys === `activityAmount${id}` || keys === `activityDate${id}`
        )
    )
    notSelectedKeys.forEach((key) => {
      if (inputs.hasOwnProperty(key)) {
        if (key.includes("activityDate")) {
          delete inputs[key]
        } else {
          inputs[key] = "0"
        }
      }
    })
  }, [reduxSelectedActivity, count])

  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    setInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs }

      reduxSelectedActivity.forEach((activity) => {
        if (activity.activityAmount) {
          const amountPropertyName = `activityAmount${activity.id}`
          updatedInputs[amountPropertyName] = activity.activityAmount
        }
        if (activity.activityDate.calendarFormat) {
          const datePropertyName = `activityDate${activity.id}`
          updatedInputs[datePropertyName] = activity.activityDate.calendarFormat
        }
      })
      return updatedInputs
    })
  }, [])

  useEffect(() => {
    const hasNoInput = Object.keys(inputs).length === 0
    !hasNoInput && dispatch(UPDATE_SELECTED_ACTIVITIES(inputs))
  }, [inputs, tab])

  const postType = useSelector((state) => state.build.postType) // Preious or Next Button
  const [prevButton, setPrevButton] = useState("deal_type")
  useEffect(() => {
    postType === "opportunity"
      ? setPrevButton("deal_type")
      : setPrevButton("recipients")
  }, [postType])

  const isSelected = (id) => {
    const isSelected = reduxSelectedActivity && reduxSelectedActivity.some((data) => data.id === id)
    return isSelected
  }

  const itemsIconStyle = {
    boxSize: 10,
    textAlign: "center",
    mb: !activitiesListLayout && 2,
  }
  const itemDescStyle = {
    fontSize: "xs",
    color: "gray.500",
    textAlign: !activitiesListLayout && "center",
  }
  const itemTitleStyle = {
    fontWeight: "semibold",
    textAlign: !activitiesListLayout && "center",
  }
  const itemContainerStyle = {
    flexDirection: !activitiesListLayout && "column",
    alignContent: "center",
    alignItems: "center",
    px: 3,
    borderRadius: "6px",
    _hover: {
      boxShadow: "md",
    },
    gap: activitiesListLayout && 4,
    width: !activitiesListLayout && "234px",
    cursor: "pointer",
    py: activitiesListLayout ? 5 : 3,
    // bgColor: "blue.100",
  }
  const listContainer = {
    flexDirection: activitiesListLayout && "column",
    flexWrap: !activitiesListLayout && "wrap",
    gap: activitiesListLayout ? 2 : 4,
  }

  // const onlineOptionalCategory = activities.onlineOptionalCategory
  // const onlineCategory = activities.onlineCategory
  // const offlineCategory = activities.offlineCategory
  // const mergedActivities = [...activities.onlineOptionalCategory, ...activities.onlineCategory, ...activities.offlineCategory]

  const [searchedOptionalCategories, setSearchedOptionalCategories] = useState(
    activities.onlineOptionalCategory
  )
  const [searchedOnlineCategories, setSearchedOnlineCategories] = useState(
    activities.onlineCategory
  )
  const [searchedOfflineCategories, setSearchedOfflineCategories] = useState(
    activities.offlineCategory
  )
  useEffect(() => {
    if (watchSearch && watchSearch.length > 0) {
      setSearchedOptionalCategories(
        activities.onlineOptionalCategory.filter(
          (activity) =>
            watchSearch &&
            activity.activityTitle
              .toLowerCase()
              .includes(watchSearch.toLowerCase())
        )
      )
      setSearchedOnlineCategories(
        activities.onlineCategory.filter(
          (activity) =>
            watchSearch &&
            activity.activityTitle
              .toLowerCase()
              .includes(watchSearch.toLowerCase())
        )
      )
      setSearchedOfflineCategories(
        activities.offlineCategory.filter(
          (activity) =>
            watchSearch &&
            activity.activityTitle
              .toLowerCase()
              .includes(watchSearch.toLowerCase())
        )
      )
    } else {
      setSearchedOptionalCategories(activities.onlineOptionalCategory)
      setSearchedOnlineCategories(activities.onlineCategory)
      setSearchedOfflineCategories(activities.offlineCategory)
    }
  }, [watchSearch])

  const inputBorder = {
    borderColor: "gray.500",
    borderWidth: "1px",
    borderStyle: "solid",
  }
  return (
    <>
      <Grid
        templateAreas={`"header"
            "main"
            "footer"`}
        gridTemplateRows={"2fr 9fr auto"}
        gridTemplateColumns={"1fr"}
        h="100vh"
      >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={"header"} pb={4}>
          <BuildMenu />

          <Flex px={20}>
            <Flex
              flexGrow={1}
              gap={8}
              pt={4}
              mb={tab ? 10 : 2}
              borderBottom={"2px solid #EBEFF2"}
            >
              <Text
                cursor={"pointer"}
                onClick={() => setTab(() => true)}
                borderBottom={tab && "2px solid #000"}
                pb={2}
              >
                Discover
              </Text>
              <Text
                cursor={"pointer"}
                onClick={() => setTab(() => false)}
                borderBottom={!tab && "2px solid #000"}
                pb={2}
              >
                Activity details {count > 0 && `(${count})`}
              </Text>
            </Flex>
          </Flex>

          {tab && (
            <Flex px={20}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  placeholder="Search activities..."
                  border={"1px solid #89949F"}
                  borderRadius={"50px"}
                  id="searchActivity"
                  {...register("searchActivity")}
                />
              </InputGroup>
            </Flex>
          )}
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem
          pl={"80px"}
          pr={"65px"}
          area={"main"}
          overflowY={"auto"}
          position={"relative"}
        >
          {tab && (
            <Flex
              bgColor={"white"}
              pb={4}
              gap={4}
              justifyContent={"flex-end"}
              position={"sticky"}
              top={"0"}
            >
              <Icon
                as={RxDashboard}
                cursor={"pointer"}
                onClick={handleListFalse}
                boxSize={6}
                color={!activitiesListLayout && "blue.400"}
              />
              <Icon
                as={TfiMenuAlt}
                cursor={"pointer"}
                onClick={handleListTrue}
                boxSize={6}
                color={activitiesListLayout && "blue.400"}
              />
            </Flex>
          )}

          {tab && (
            <Box pb={6}>
              <Flex pb={3}>
                <Text fontWeight={"semibold"}>
                  ONLINE - Optional automated publishing available
                </Text>
              </Flex>
              {searchedOptionalCategories.length > 0 ? (
                <Flex sx={listContainer}>
                  {searchedOptionalCategories.map((activity) => {
                    const {
                      id,
                      icon,
                      color,
                      activityTitle,
                      activityDescription,
                    } = activity
                    return (
                      <Flex
                        key={id}
                        sx={itemContainerStyle}
                        onClick={() =>
                          dispatch(ADD_OR_REMOVE_ACTIVITIES(activity))
                        }
                        bgColor={isSelected(id) && "blue.100"}
                        border={
                          isSelected(id)
                            ? "1px solid #90CDF4"
                            : "1px solid transparent"
                        }
                        w={"236px"} //Additional, remove this after testing if doesn't work
                        minW={"200px"} //Additional, remove this after testing if doesn't work
                      >
                        <Icon as={icon} color={color} sx={itemsIconStyle} />
                        <Box>
                          <Text sx={itemTitleStyle}>{activityTitle}</Text>
                          <Text sx={itemDescStyle}>{activityDescription}</Text>
                        </Box>
                      </Flex>
                    )
                  })}
                </Flex>
              ) : (
                <Text color={"gray.400"}>No activities found.</Text>
              )}
            </Box>
          )}
          {tab && (
            <Box pb={6}>
              <Flex pb={3}>
                <Text fontWeight={"semibold"}>ONLINE</Text>
              </Flex>
              {searchedOnlineCategories.length > 0 ? (
                <Flex sx={listContainer}>
                  {searchedOnlineCategories.map((activity) => {
                    const {
                      id,
                      icon,
                      color,
                      activityTitle,
                      activityDescription,
                    } = activity
                    return (
                      <Flex
                        key={id}
                        sx={itemContainerStyle}
                        onClick={() =>
                          dispatch(ADD_OR_REMOVE_ACTIVITIES(activity))
                        }
                        bgColor={isSelected(id) && "blue.100"}
                        border={
                          isSelected(id)
                            ? "1px solid #90CDF4"
                            : "1px solid transparent"
                        }
                      >
                        <Icon as={icon} color={color} sx={itemsIconStyle} />
                        <Box>
                          <Text sx={itemTitleStyle}>{activityTitle}</Text>
                          <Text sx={itemDescStyle}>{activityDescription}</Text>
                        </Box>
                      </Flex>
                    )
                  })}
                </Flex>
              ) : (
                <Text color={"gray.400"}>No activities found.</Text>
              )}
            </Box>
          )}

          {tab && (
            <Box pb={6}>
              <Flex pb={3}>
                <Text fontWeight={"semibold"}>OFFLINE</Text>
              </Flex>
              {searchedOfflineCategories.length > 0 ? (
                <Flex sx={listContainer}>
                  {searchedOfflineCategories.map((activity) => {
                    const {
                      id,
                      icon,
                      color,
                      activityTitle,
                      activityDescription,
                    } = activity
                    return (
                      <Flex
                        key={id}
                        sx={itemContainerStyle}
                        onClick={() =>
                          dispatch(ADD_OR_REMOVE_ACTIVITIES(activity))
                        }
                        bgColor={isSelected(id) && "blue.100"}
                        border={
                          isSelected(id)
                            ? "1px solid #90CDF4"
                            : "1px solid transparent"
                        }
                      >
                        <Icon as={icon} color={color} sx={itemsIconStyle} />
                        <Box>
                          <Text sx={itemTitleStyle}>{activityTitle}</Text>
                          <Text sx={itemDescStyle}>{activityDescription}</Text>
                        </Box>
                      </Flex>
                    )
                  })}
                </Flex>
              ) : (
                <Text color={"gray.400"}>No activities found.</Text>
              )}
            </Box>
          )}

          {/* -------------------------------------- Tab 2 -------------------------------------- */}
          {!tab && (
            <Flex pb={6} flexDirection={"column"} gap={4}>
              {count ? (
                reduxSelectedActivity.map((activity, index) => {
                  return (
                    <Flex
                      key={index}
                      flexDirection={"column"}
                      borderColor={"gray.300"}
                      borderWidth={"1px"}
                      borderStyle={"solid"}
                      borderRadius={"6px"}
                    >
                      <Flex
                        flexGrow={1}
                        justifyContent={"space-between"}
                        p={2}
                        borderBottom={"1px solid #EBEFF2"}
                      >
                        <Flex alignItems={"flex-start"} gap={2}>
                          <Icon
                            as={
                              activity.activityDate &&
                              activity.activityAmount > 0
                              // activity.activityDate !== "0" &&
                              // activity.activityDate.length > 0 &&
                              // (activity.activityDate ||
                              //   activity.activityDate !== undefined)
                                ? BsCheckCircleFill
                                : BsExclamationCircleFill
                            }
                            color={
                              activity.activityDate &&
                              activity.activityAmount > 0
                              // activity.activityDate !== "0" &&
                              // activity.activityDate.length > 0 &&
                              // (activity.activityDate ||
                              //   activity.activityDate !== undefined)
                                ? "green.500"
                                : "gray.500"
                            }
                            mt={"8px"}
                            boxSize={4}
                          />
                          <Box>
                            <Text fontSize={"xl"} fontWeight={"semibold"}>
                              {activity.activityTitle}
                            </Text>
                            {activity.activityAmount > 0 && (
                              <Text fontSize={"sm"} color={"green.700"}>
                                {`$${parseInt(
                                  activity.activityAmount
                                ).toLocaleString()}.00`}
                              </Text>
                            )}
                          </Box>
                        </Flex>
                        <Flex alignItems={"center"} gap={4}>
                          <Icon
                            as={BiTrash}
                            boxSize={5}
                            color={"blue.400"}
                            cursor={"pointer"}
                            onClick={() =>
                              dispatch(ADD_OR_REMOVE_ACTIVITIES(activity))
                            }
                          />
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={{
                              zIndex: 10,
                              rotate: activeChecker(activity) ? 180 : 0,
                              y: activeChecker(activity) ? "-5px" : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            onClick={() =>
                              handleActiveActivityClick(activity.id)
                            }
                          >
                            <Icon as={BiChevronUp} boxSize={6} />
                          </motion.div>
                        </Flex>
                      </Flex>

                      <motion.div
                        animate={{
                          height: activeChecker(activity) ? 0 : "fit-content",
                          opacity: activeChecker(activity) ? 0 : 1,
                        }}
                      >
                        <Flex
                          flexGrow={1}
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                          p={2}
                          borderBottom={"1px solid #EBEFF2"}
                        >
                          <Text color={"gray.400"} fontWeight={"semibold"}>
                            Payment
                          </Text>
                          <Flex>
                            <Text
                              color={"red"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                            >
                              *
                            </Text>
                            <Text
                              color={"gray.700"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                            >
                              Amount
                            </Text>
                          </Flex>
                          <Text fontSize={"xs"}>
                            Amount to be paid for the activity
                          </Text>
                          <InputGroup my={2}>
                            <InputLeftElement
                              pt={1}
                              pointerEvents="none"
                              color={"gray.800"}
                              children={<BsCurrencyDollar />}
                            />
                            <NumberInput
                              name={`activityAmount${activity.id}`}
                              defaultValue={
                                (activity.activityAmount > 0 &&
                                  activity.activityAmount) ||
                                0
                              }
                              precision={2}
                            >
                              <NumberInputField
                                sx={inputBorder}
                                placeholder="0.00"
                                pl={7}
                                onChange={handleOnChange}
                              />
                            </NumberInput>
                          </InputGroup>
                        </Flex>
                      </motion.div>

                      <motion.div
                        animate={{
                          height: activeChecker(activity) ? 0 : "fit-content",
                          opacity: activeChecker(activity) ? 0 : 1,
                        }}
                      >
                        <Flex
                          flexGrow={1}
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                          p={2}
                          borderBottom={"1px solid #EBEFF2"}
                        >
                          <Text color={"gray.400"} fontWeight={"semibold"}>
                            Due date
                          </Text>
                          <Flex>
                            <Text
                              color={"red"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                            >
                              *
                            </Text>
                            <Text
                              color={"gray.700"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                            >
                              Date and time
                            </Text>
                          </Flex>
                          <Text fontSize={"xs"}>
                            Date and time activity is to be completed by
                          </Text>
                          <InputGroup>
                            <Input
                              maxW={"300px"}
                              value={activity.activityDate && activity.activityDate.calendarFormat}
                              sx={inputBorder}
                              my={2}
                              placeholder="Select Date and Time"
                              size="md"
                              type="datetime-local"
                              min={getTimeToUTCFromLocal()}
                              name={`activityDate${activity.id}`}
                              onChange={handleOnChange}
                            />
                          </InputGroup>
                        </Flex>
                      </motion.div>

                      <Flex
                        px={2}
                        alignItems={"center"}
                        gap={1}
                        pb={2}
                        color={"blue.400"}
                      >
                        <Icon
                          as={BiTrash}
                          zIndex={10}
                          boxSize={4}
                          onClick={() =>
                            dispatch(ADD_OR_REMOVE_ACTIVITIES(activity))
                          }
                          cursor={"pointer"}
                        />
                        <Text
                          onClick={() =>
                            dispatch(ADD_OR_REMOVE_ACTIVITIES(activity))
                          }
                          zIndex={10}
                          cursor={"pointer"}
                        >
                          Remove activity
                        </Text>
                      </Flex>
                    </Flex>
                  )
                })
              ) : (
                <Flex
                  flexDirection={"column"}
                  height={"40vh"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  gap={4}
                >
                  <Text
                    fontSize={"lg"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                  >
                    No activities have been selected
                  </Text>
                  <Button
                    onClick={() => setTab(() => true)}
                    colorScheme="twitter"
                    width={"fit-content"}
                    margin={"0 auto"}
                  >
                    Select Activities
                  </Button>
                </Flex>
              )}
            </Flex>
          )}
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(SET_ACTIVE_STEP(prevButton))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme={activitiesTabReady ? "twitter" : "gray"}
              onClick={() => dispatch(SET_ACTIVE_STEP("details"))}
            >
              {activitiesTabReady ? "Next Step" : "Skip step for now"}
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default ActivitiesNav1
