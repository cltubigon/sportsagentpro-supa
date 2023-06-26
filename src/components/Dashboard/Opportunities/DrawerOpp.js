import {
  Drawer,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  Icon,
  GridItem,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react"
import { useState } from "react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { Editor } from "draft-js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useRef } from "react"
import { comStyle } from "./styleAthleteOpportunities"
import { activityList } from "../../Build/activityList"
import { applyToPost } from "../../../store/actions/postActions"

const UtilDrawer = ({
  isOpen,
  onOpen,
  onClose,
  drawerData,
  drawerViewMore,
  setDrawerViewMore,
}) => {
  const dispatch = useDispatch()
  const flexRef = useRef(null)

  const auth = useSelector((state) => state.auth)
  const firebase = useSelector((state) => state.firebase)
  const firestore = useSelector((state) => state.firestore)

  const [isLoading, setIsloading] = useState(false)
  const [hasApplied, setHasAhasApplied] = useState(false)

  const { email } = auth
  const { sectionContainer, drawer } = comStyle

  const firestorePost = firestore.ordered.posts

  const handleViewMore = () => {
    setDrawerViewMore((prev) => !prev)
  }

  const handleApply = (id) => {
    firebase.auth && dispatch(applyToPost(id, email))
    setIsloading(true)
  }

  useEffect(() => {
    const selectedPost =
      firestorePost &&
      drawerData &&
      firestorePost.find((post) => post.id === drawerData.id)
    console.log("selectedPost: ", selectedPost)
    const applied =
      selectedPost &&
      selectedPost.postApplicants &&
      selectedPost.postApplicants.some((applicant) => applicant === email)
    applied ? setHasAhasApplied(true) : setHasAhasApplied(false)
    setIsloading(false)
  }, [firestorePost, drawerData])

  const mergedCategories = [
    ...activityList.onlineOptionalCategory,
    ...activityList.onlineCategory,
    ...activityList.offlineCategory,
  ]

  return (
    <>
      {drawerData && (
        <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton zIndex={810} />
            <DrawerBody py={0} position={"relative"}>
              {isLoading && (
                <Flex sx={drawer.drawerSpinner}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="lg"
                  />
                </Flex>
              )}
              <Grid
                templateAreas={`"a a"
                "b b"
                "c c"
                `}
                gridTemplateRows={"2fr 20fr 2fr"}
                gridTemplateColumns={"150px 1fr"}
                h="100vh"
                py={2}
                ref={flexRef}
              >
                <GridItem pl="2" area={"a"}>
                  <Flex>
                    <Flex alignItems={"center"} gap={4}>
                      <Image
                        sx={drawer.header.image}
                        src={imageHolderRemovable}
                        alt="Dan Abramov"
                      />
                      <Flex sx={drawer.header.textContainer}>
                        <Text sx={drawer.header.companyName}>
                          {drawerData.postOwnerFirstName}{" "}
                          {drawerData.postOwnerLastName}
                        </Text>
                        <Flex sx={drawer.header.statConainer}>
                          <Text sx={drawer.header.statConainer.text}>Open</Text>
                          <Icon
                            as={FaCircle}
                            sx={drawer.header.statConainer.icon}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem
                  display={"flex"}
                  overflowY={"auto"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  area={"b"}
                >
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.details.secContainer}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Details
                      </Heading>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Activities</Text>
                        <Text sx={drawer.details.data} noOfLines={[1]}>
                          {drawerData.selectedActivities.length > 0 &&
                            drawerData.selectedActivities
                              .map((activity) => activity.activityTitle)
                              .join(" • ")}
                        </Text>
                      </Flex>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Expires</Text>
                        <Text sx={drawer.details.data}>
                          {(drawerData.postExpirationDate.utcFormat !==
                            "Invalid Date" &&
                            drawerData.postExpirationDate.utcFormat) ||
                            "-"}
                        </Text>
                      </Flex>
                      <Flex sx={drawer.details.flexContainer}>
                        <Text sx={drawer.details.label}>Compensation</Text>
                        <Text sx={drawer.details.data}>
                          {`$${new Intl.NumberFormat(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(parseFloat(drawerData.totalAmount))}`}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex sx={sectionContainer}>
                    <Flex
                      sx={drawer.brief.secContainer}
                      maxHeight={drawerViewMore && "220px"}
                    >
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Brief
                      </Heading>
                      <Text sx={drawer.brief.postTitle}>
                        {drawerData.postTitle}
                      </Text>
                      <Flex noOfLines={drawerViewMore && [3]}>
                        <Editor editorState={drawerData.editorState} readOnly />
                      </Flex>
                    </Flex>
                    <Text sx={drawer.brief.viewMore} onClick={handleViewMore}>
                      {drawerViewMore ? "View more" : "View less"}
                    </Text>
                  </Flex>
                  <Flex sx={sectionContainer}>
                    <Flex sx={drawer.activities.secContainer}>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Activities
                      </Heading>
                      <Flex
                        sx={drawer.activities.tableContainer}
                        maxH={drawerViewMore && "200px"}
                      >
                        <Flex sx={drawer.activities.rowContainer} flexGrow={1}>
                          <Text>Activity</Text>
                          {drawerData.selectedActivities.map((activity) => {
                            const currentIcon = mergedCategories.filter(data=> data.id === activity.id).map((mapped) => {
                              const {icon, color} = mapped
                              const newObject = {icon, color}
                              return newObject
                            })
                            console.log('currentIcon: ', currentIcon)
                            return (
                              <Flex
                                key={activity.id}
                                sx={drawer.activities.tableData}
                              >
                                <Icon
                                  as={currentIcon[0].icon}
                                  color={currentIcon[0].color}
                                  boxSize={5}
                                />
                                <Text>{activity.activityTitle}</Text>
                              </Flex>
                            )
                          })}
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"230px"}
                        >
                          <Text>Fulfillment date</Text>
                          {drawerData.selectedActivities.map((activity) => {
                            return (
                              <Text
                                key={activity.id}
                                sx={drawer.activities.tableData}
                              >
                                {(activity.activityDate.utcFormat !==
                                  "Invalid Date" &&
                                  activity.activityDate.utcFormat) ||
                                  "-"}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"135px"}
                        >
                          <Text>Value</Text>
                          {drawerData.selectedActivities.map((activity) => {
                            const formatter = new Intl.NumberFormat(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                            const formattedAmount = formatter.format(
                              parseFloat(activity.activityAmount)
                            )
                            return (
                              <Text
                                key={activity.id}
                                sx={drawer.activities.tableData}
                              >
                                ${formattedAmount}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex
                          sx={drawer.activities.rowContainer}
                          flexBasis={"135px"}
                        >
                          <Text>Status</Text>
                          {drawerData.selectedActivities.map((activity) => {
                            return (
                              <Flex
                                sx={drawer.activities.tableData}
                                flexGrow={"100%"}
                                gap={2}
                                alignItems={"center"}
                              >
                                <Text>Draft</Text>
                                <Icon
                                  as={FaCircle}
                                  boxSize={2}
                                  color={"green.400"}
                                />
                              </Flex>
                            )
                          })}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex>
                      <Heading sx={drawer.secTitle} as={"h5"}>
                        Tags
                      </Heading>
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem area={"c"} sx={drawer.applyGrid}>
                  <Button
                    sx={
                      hasApplied ? drawer.btnHasApplied : drawer.btnNotApplied
                    }
                    onClick={(event) => handleApply(drawerData.id)}
                  >
                    {hasApplied ? "Withdraw" : "Apply Now"}
                  </Button>
                </GridItem>
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

export default UtilDrawer