import { Grid, Box, GridItem, Button, Flex, Icon, Text } from "@chakra-ui/react"
import { TfiPencilAlt } from "react-icons/tfi"
import { CgMenuGridO } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import {
  SAVE_POST_TYPE,
  SET_ACTIVE_STEP,
} from "../../store/actions/buildPostActions"
import { BsChevronRight } from "react-icons/bs"
import BuildMenu from "./BuildMenu"
import { bdts } from "../../styles/buildStyles/buildDealTypeStyle"

const DealTypeV1 = () => {
  console.log('Deal type is rendered')
  const dispatch = useDispatch()

  //   const reduxState = useSelector((state) => state)
  //   console.log("reduxState: ", reduxState)
  const build = useSelector((state) => state.build)
  const { postType } = build

  const handleNextButtonClick = () => {
    postType === "opportunity" && dispatch(SET_ACTIVE_STEP("activities"))
    postType !== "opportunity" && dispatch(SET_ACTIVE_STEP("recipients"))
  }

  const handlePostTypeClick = (type) => {
    dispatch(SAVE_POST_TYPE(type))
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
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem sx={bdts.contentGridContainer}>
          <Flex gap={6} flexDirection={"column"}>
            <Flex
              sx={
                postType === "offer"
                  ? bdts.selectedOfferType
                  : bdts.notSelectedOfferType
              }
              onClick={() => handlePostTypeClick("offer")}
            >
              <Flex sx={bdts.iconContainer}>
                <Icon color={"gray.500"} boxSize={6} as={TfiPencilAlt} />
              </Flex>
              <Box>
                <Text sx={bdts.typeTitle}>Offer</Text>
                <Text sx={bdts.typeDesc}>
                  Offers are deals that are sent directly to one or more
                  recipients, allowing you to target exactly who you want.
                </Text>
              </Box>
            </Flex>

            <Flex
              sx={
                postType === "opportunity"
                  ? bdts.selectedOpportunityType
                  : bdts.notSelectedOpportunityType
              }
              onClick={() => handlePostTypeClick("opportunity")}
            >
              <Flex sx={bdts.iconContainer}>
                <Icon color={"gray.500"} boxSize={6} as={CgMenuGridO} />
              </Flex>
              <Box>
                <Text sx={bdts.typeTitle}>Opportunity</Text>
                <Text sx={bdts.typeDesc}>
                  Opportunities are posted for all users in the marketplace to
                  review and apply to, giving you the flexibility to select from
                  a pool of applicants.
                </Text>
              </Box>
            </Flex>
          </Flex>
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"flex-end"} bottom={"0"}>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="twitter"
              onClick={handleNextButtonClick}
            >
              Next Step
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default DealTypeV1