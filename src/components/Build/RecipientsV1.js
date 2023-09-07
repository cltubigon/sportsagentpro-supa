import { SearchIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Grid,
  GridItem,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  InputGroup,
  Text,
  InputLeftElement,
  Input,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { TfiMenuAlt } from "react-icons/tfi"
import { RxDashboard } from "react-icons/rx"
import React, { useEffect, useState } from "react"
import {
  setActiveStep,
  setRecipientsListLayout,
  setSelectedRecipients,
} from "../../store/actions/buildPostActions"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import { useForm } from "react-hook-form"
import BuildMenu from "./BuildMenu"
import {
  SkeletonBuildRecipientsTab,
  SkeletonBuildRecipientsTabColumn,
} from "../Skeleton/SkeletonBuildRecipientsTab"
import { listenAndSaveToBuildAthletes } from "../../store/actions/Fetch/fetchAthletesAction"

const RecipientsV1 = () => {
  console.count('RecipientsV1 is rendered')
  const dispatch = useDispatch()
  const { register, watch } = useForm()

  // const reduxState = useSelector((state) => state)
  // console.log('reduxState: ', reduxState)
  const localAthletes = useSelector((state) => state.athlete.buildAthletes.data)
  const build = useSelector((state) => state.build)
  const currentTimeStamp = useSelector(
    (state) => state.athlete.buildAthletes.lastUpdated
  )
  const selectedRecipients = useSelector(
    (state) => state.build.selectedRecipients
  )
  
  console.log('selectedRecipients: ', selectedRecipients)
  const [isLoading, setIsloading] = useState(true)
  const [tab, setTab] = useState(true)

  const { recipientsListLayout } = build

  useEffect(() => {
    dispatch(listenAndSaveToBuildAthletes(currentTimeStamp))
  }, [])
  useEffect(() => {
    localAthletes && setIsloading(false)
  }, [localAthletes])

  const handleListTrue = () => {
    dispatch(setRecipientsListLayout(true))
  }
  const handleListFalse = () => {
    dispatch(setRecipientsListLayout(false))
  }

  const handleItemClick = (id) => {
    dispatch(setSelectedRecipients(id))
  }

  const recipientContainer = {
    alignItems: "center",
    gap: 3,
    px: 4,
    py: 2,
    borderRadius: "5px",
    border: "1px solid transparent",
    _hover: { border: "1px solid #EBEFF2" },
    width: !recipientsListLayout && "234px",
    flexDirection: !recipientsListLayout && "column",
    cursor: "pointer",
    border: !recipientsListLayout
      ? "1px solid #EBEFF2"
      : "1px solid transparent",
  }
  const itemsContainer = {
    display: "flex",
    flexDirection: recipientsListLayout && "column",
    flexWrap: !recipientsListLayout && "wrap",
    gap: !recipientsListLayout && 4,
  }
  const athleteName = {
    fontWeight: "semibold",
    textAlign: !recipientsListLayout && "center",
  }
  const athleteDescription = {
    fontSize: "sm",
    color: "gray.500",
    textAlign: !recipientsListLayout && "center",
  }
  const iconStyle = {
    boxSize: 5,
    mr: !recipientsListLayout && "auto",
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
                onClick={() => setTab(() => true)}
                borderBottom={tab ? "2px solid #000" : "none"}
                pb={2}
                cursor={"pointer"}
              >
                Discover
              </Text>
              <Text
                onClick={() => setTab(() => false)}
                color={selectedRecipients.length < 1 && "gray.400"}
                borderBottom={tab ? "none" : "2px solid #000"}
                pb={2}
                cursor={"pointer"}
              >
                Selected Recipients{" "}
                {selectedRecipients.length > 0 &&
                  `(${selectedRecipients.length})`}
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
                  id="searchQuery"
                  {...register("searchQuery")}
                  placeholder="Search activities..."
                  border={"1px solid #89949F"}
                  borderRadius={"50px"}
                />
              </InputGroup>
            </Flex>
          )}
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        {/* -------------------------------------- First Tab -------------------------------------- */}
        <GridItem
          pl={"80px"}
          pr={"65px"}
          area={"main"}
          overflowY={"auto"}
          position={"relative"}
        >
          <Flex
            bgColor={"#fff"}
            zIndex={"10"}
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
              color={!recipientsListLayout && "blue.400"}
            />
            <Icon
              as={TfiMenuAlt}
              cursor={"pointer"}
              onClick={handleListTrue}
              boxSize={6}
              color={recipientsListLayout && "blue.400"}
            />
          </Flex>

          {tab && (
            <Flex flexBasis={"100%"} flexDirection={"column"} flexGrow={1}>
              <FormControl>
                <InputGroup sx={itemsContainer}>
                  {isLoading &&
                    (!recipientsListLayout ? (
                      <SkeletonBuildRecipientsTabColumn />
                    ) : (
                      <SkeletonBuildRecipientsTab />
                    ))}
                  {!isLoading &&
                    localAthletes.map((athlete) => {
                      const isChecked = selectedRecipients.includes(athlete.id)
                      return (
                        <Flex
                          key={athlete.id}
                          sx={recipientContainer}
                          onClick={() => handleItemClick(athlete.id)}
                        >
                          {isChecked ? (
                            <Icon sx={iconStyle} as={MdCheckBox} />
                          ) : (
                            <Icon as={MdCheckBoxOutlineBlank} sx={iconStyle} />
                          )}
                          <Avatar name={athlete.initials}>
                            <AvatarBadge boxSize="0.9em" bg="green.500" />
                          </Avatar>
                          <Box pl={2}>
                            <Text sx={athleteName}>
                              {athlete.firstName} {athlete.lastName}
                            </Text>
                            <Text sx={athleteDescription}>
                              Student-Athlete • Tennis • Fresno State Bulldogs
                            </Text>
                          </Box>
                        </Flex>
                      )
                    })}
                </InputGroup>
              </FormControl>
            </Flex>
          )}

          {/* -------------------------------------- Second Tab -------------------------------------- */}
          {!tab && (
            <Flex flexBasis={"100%"} flexDirection={"column"} flexGrow={1}>
              {selectedRecipients.length > 0 ? (
                <FormControl>
                  <InputGroup sx={itemsContainer}>
                    {isLoading &&
                      (!recipientsListLayout ? (
                        <SkeletonBuildRecipientsTabColumn />
                      ) : (
                        <SkeletonBuildRecipientsTab />
                      ))}
                    {!isLoading &&
                      localAthletes
                        .filter((athlete) =>
                          selectedRecipients.includes(athlete.id)
                        )
                        .map((athlete) => {
                          return (
                            <Flex
                              key={athlete.id}
                              sx={recipientContainer}
                              onClick={() => handleItemClick(athlete.id)}
                            >
                              <Icon as={MdCheckBox} sx={iconStyle} />
                              <Avatar name={athlete.initials}>
                                <AvatarBadge boxSize="0.9em" bg="green.500" />
                              </Avatar>
                              <Box pl={2}>
                                <Text sx={athleteName}>
                                  {athlete.firstName} {athlete.lastName}
                                </Text>
                                <Text sx={athleteDescription}>
                                  Student-Athlete • Tennis • Fresno State
                                  Bulldogs
                                </Text>
                              </Box>
                            </Flex>
                          )
                          // }
                        })}
                    {selectedRecipients.length < 1 && (
                      <Flex>
                        <Text>No data found</Text>
                      </Flex>
                    )}
                  </InputGroup>
                </FormControl>
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
                    No recipients have been selected
                  </Text>
                  <Button
                    onClick={() => setTab(() => true)}
                    colorScheme="twitter"
                    width={"fit-content"}
                    margin={"0 auto"}
                  >
                    Select Recipients
                  </Button>
                </Flex>
              )}
            </Flex>
          )}
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"} bottom={"0"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(setActiveStep("deal_type"))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="twitter"
              onClick={() => dispatch(setActiveStep("activities"))}
            >
              Next Step
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default RecipientsV1
