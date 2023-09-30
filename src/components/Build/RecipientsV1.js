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
  SET_ACTIVE_STEP,
  SET_RECIPIENTS_LIST_LAYOUT,
  SET_SELECTED_RECIPIENTS,
} from "../../store/actions/buildPostActions"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import { useForm } from "react-hook-form"
import BuildMenu from "./BuildMenu"
import {
  SkeletonBuildRecipientsTab,
  SkeletonBuildRecipientsTabColumn,
  SkeletonLoaderBuildRecipientsTab,
  SkeletonLoaderBuildRecipientsTabColumn,
} from "../Skeleton/SkeletonBuildRecipientsTab"
import { SET_ATHLETES } from "../../store/actions/athleteActions"

const RecipientsV1 = () => {
  const dispatch = useDispatch()
  const { register } = useForm()
  
  const localAthletes = useSelector((state) => state.athlete.athletes)
  const { currentPage } = useSelector(
    (state) => state.utils.pagination.athletes
  )
  
  const recipientsListLayout = useSelector(
    (state) => state.build.recipientsListLayout
  )
  const selectedRecipients = useSelector(
    (state) => state.build.selectedRecipients
  )

  const [isLoading, setIsloading] = useState(true)
  const [tab, setTab] = useState(true)

  useEffect(() => {
    dispatch(SET_ATHLETES())
  }, [currentPage])

  useEffect(() => {
    localAthletes && setIsloading(false)
  }, [localAthletes])

  const handleListTrue = () => {
    dispatch(SET_RECIPIENTS_LIST_LAYOUT(true))
  }
  const handleListFalse = () => {
    dispatch(SET_RECIPIENTS_LIST_LAYOUT(false))
  }

  const handleItemClick = (id) => {
    dispatch(SET_SELECTED_RECIPIENTS(id))
  }

  const recipientContainer = {
    alignItems: "center",
    gap: 3,
    px: 4,
    py: 2,
    borderRadius: "5px",
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
                      const isChecked = selectedRecipients.includes(athlete.uid)
                      return (
                        <Flex
                          key={athlete.uid}
                          sx={recipientContainer}
                          onClick={() => handleItemClick(athlete.uid)}
                        >
                          {isChecked ? (
                            <Icon sx={iconStyle} as={MdCheckBox} />
                          ) : (
                            <Icon as={MdCheckBoxOutlineBlank} sx={iconStyle} />
                          )}
                          <Avatar name={`${athlete.firstName[0]} ${athlete.lastName[0]}`}>
                            <AvatarBadge boxSize="0.9em" bg="green.500" />
                          </Avatar>
                          <Box pl={2}>
                            <Text sx={athleteName}>
                              {athlete.lastName}, {athlete.firstName}
                            </Text>
                            <Text sx={athleteDescription}>
                              Student-Athlete • Tennis • Fresno State Bulldogs
                            </Text>
                          </Box>
                        </Flex>
                      )
                    })}
                  {!isLoading &&
                    (!recipientsListLayout ? (
                      <SkeletonLoaderBuildRecipientsTabColumn />
                    ) : (
                      <SkeletonLoaderBuildRecipientsTab />
                    ))}
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
                          selectedRecipients.includes(athlete.uid)
                        )
                        .map((athlete) => {
                          return (
                            <Flex
                              key={athlete.uid}
                              sx={recipientContainer}
                              onClick={() => handleItemClick(athlete.uid)}
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
              onClick={() => dispatch(SET_ACTIVE_STEP("deal_type"))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="twitter"
              onClick={() => dispatch(SET_ACTIVE_STEP("activities"))}
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
