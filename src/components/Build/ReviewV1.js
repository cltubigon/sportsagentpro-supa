import {
  Grid,
  GridItem,
  Button,
  Flex,
  Icon,
  Text,
  Box,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import {
  BsChevronLeft,
  BsChevronRight,
  BsCircleFill,
  BsExclamationTriangle,
  BsFacebook,
  BsLinkedin,
  BsPlus,
  BsTwitter,
} from "react-icons/bs"
import { TfiClose, TfiMenuAlt } from "react-icons/tfi"
import {
  setActiveStep,
  setContent,
  setReviewTabStatus,
} from "../../store/actions/buildPostActions"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useState } from "react"
import { useEffect } from "react"
import { TfiPencilAlt } from "react-icons/tfi"
import { CgMenuGridO } from "react-icons/cg"
import {
  BsBox,
  BsCamera,
  BsCheckCircleFill,
  BsCurrencyDollar,
  BsExclamationCircleFill,
  BsHeadset,
  BsInstagram,
  BsMic,
  BsPen,
  BsPeople,
  BsSnapchat,
  BsTiktok,
  BsYoutube,
} from "react-icons/bs"
import { HiDotsHorizontal, HiOutlineUserGroup } from "react-icons/hi"
import { FaIcons } from "react-icons/fa"
import { GoMegaphone } from "react-icons/go"
import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineCoPresent } from "react-icons/md"
import { BiRun, BiUserVoice } from "react-icons/bi"
import { TbLicense } from "react-icons/tb"
import moment from "moment/moment"
import NoSelected from "./NoSelected"
import { Link } from "react-router-dom"

const ReviewV1 = () => {
  const dispatch = useDispatch()
  const reduxPosts = useSelector((state) => state.build)
  const {
    postContent,
    postType,
    recipients,
    selectedActivities,
    postTitle,
    postExpirationDate,
    detailsTabReady,
    activitiesTabReady,
  } = reduxPosts

  const getSelectedRecpients = recipients && recipients.filter(data => data.isChecked)
  const count = getSelectedRecpients && getSelectedRecpients.length

  const [viewMore, setViewMore] = useState(false)
  const [hasBrief, setHasBrief] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  console.log('postExpirationDate: ', postExpirationDate)

  // const isoExpDate =
  //   postExpirationDate && new Date(postExpirationDate).toISOString()
  // const utcExpDate =
  //   postExpirationDate &&
  //   new Date(isoExpDate).toUTCString().replace("GMT", "UTC")

  const selectedRecipients =
    recipients && recipients.filter((recipient) => recipient.isChecked)

  // useEffect(() => {
  //   ((postType === 'offer' && count > 0 ||
  //     activitiesTabReady ||
  //     detailsTabReady) ||
  //     (postType === 'opportunity' && activitiesTabReady ||
  //     detailsTabReady)) ? dispatch(setReviewTabStatus(true)) : dispatch(setReviewTabStatus(false))
  // }, [count, activitiesTabReady, detailsTabReady])

  useEffect(() => {
    if (postContent) {
      // const rawDataParsed = postContent && JSON.parse(postContent)
      const rawDataParsed = postContent && postContent
      const hasBrief = rawDataParsed.blocks[0].text
      setHasBrief(hasBrief)
      const contentState = convertFromRaw(rawDataParsed)
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [postContent])

  const recipientContainer = {
    alignItems: "center",
    gap: 3,
    px: 4,
    py: 2,
    borderRadius: "5px",
    border: "1px solid transparent",
    _hover: { border: "1px solid #EBEFF2" },
  }

  const activities = {
    onlineOptionalCategory: [
      {
        id: 1,
        activityTitle: "Twitter Post",
        activityDescription: "One tweet with text or media",
        color: "#1CA1F2",
        icon: BsTwitter,
        isChecked: false,
        value: "twitterPost",
      },
      {
        id: 2,
        activityTitle: "Twitter Video Monetization",
        activityDescription:
          "Videos added to Twitter's video monetization program",
        color: "#1CA1F2",
        icon: BsTwitter,
        isChecked: false,
        value: "twitterVideoMonetization",
      },
      {
        id: 3,
        activityTitle: "Facebook Post",
        activityDescription: "One page post with text or media",
        color: "#1877F2",
        icon: BsFacebook,
        isChecked: false,
        value: "facebookPost",
      },
      {
        id: 4,
        activityTitle: "LinkedIn Post",
        activityDescription: "One timeline post with text or media",
        color: "#0077B7",
        icon: BsLinkedin,
        isChecked: false,
        value: "",
      },
    ],
    onlineCategory: [
      {
        id: 5,
        activityTitle: "Instagram Post",
        activityDescription:
          "One photo, video, or carousel post shared to profile",
        color: "#2596be",
        icon: BsInstagram,
        isChecked: false,
        value: "instagramPost",
      },
      {
        id: 6,
        activityTitle: "Instagram Story",
        activityDescription:
          "One story that stays live for 24 hours. Specify # of frames",
        color: "#E4405F",
        icon: BsInstagram,
        isChecked: false,
        value: "instagramStory",
      },
      {
        id: 7,
        activityTitle: "Instagram Reels",
        activityDescription: "One original video shared as a Reel",
        color: "#E4405F",
        icon: BsInstagram,
        isChecked: false,
        value: "instagramReels",
      },
      {
        id: 8,
        activityTitle: "Facebook Story",
        activityDescription:
          "One story that stays live for 24 hours on public FB page",
        color: "#1877F2",
        icon: BsFacebook,
        isChecked: false,
        value: "facebookStory",
      },
      {
        id: 9,
        activityTitle: "Facebook Live",
        activityDescription: "One live Facebook broadcast at a dedicated time",
        color: "#1877F2",
        icon: BsFacebook,
        isChecked: false,
        value: "facebookLive",
      },
      {
        id: 10,
        activityTitle: "YouTube Post",
        activityDescription: "One video uploaded to a user's channel",
        color: "#FF0300",
        icon: BsYoutube,
        isChecked: false,
        value: "youtubePost",
      },
      {
        id: 11,
        activityTitle: "TikTok Post",
        activityDescription: "One original video posted to a user's profile",
        color: "gray.700",
        icon: BsTiktok,
        isChecked: false,
        value: "tiktokPost",
      },
      {
        id: 12,
        activityTitle: "Snapchat Story",
        activityDescription: "One Snapchat story",
        color: "#FFFC00",
        icon: BsSnapchat,
        isChecked: false,
        value: "snapchatStory",
      },
      {
        id: 13,
        activityTitle: "Snapchat Spotlight",
        activityDescription: "One Snapchat spotlight",
        color: "#FFFC00",
        icon: BsSnapchat,
        isChecked: false,
        value: "snapchatSpotlight",
      },
      {
        id: 14,
        activityTitle: "Group Licensing",
        activityDescription: "One Snapchat spotlight",
        color: "gray.700",
        icon: HiOutlineUserGroup,
        isChecked: false,
        value: "groupLicensing",
      },
      {
        id: 15,
        activityTitle: "Podcast Appearance",
        activityDescription: "One video or audio podcast appearance",
        color: "gray.700",
        icon: BsMic,
        isChecked: false,
        value: "podcastAppearance",
      },
      {
        id: 16,
        activityTitle: "Digital Press Interview",
        activityDescription: "One online video or audio interview",
        color: "gray.700",
        icon: BsHeadset,
        isChecked: false,
        value: "digitalPressInterview",
      },
      {
        id: 17,
        activityTitle: "Photo / Video / Audio Creation",
        activityDescription:
          "One piece of custom photo, video, or audio content",
        color: "gray.700",
        icon: FaIcons,
        isChecked: false,
        value: "photoVideoAudioCreation",
      },
      {
        id: 18,
        activityTitle: "Video Shoutout",
        activityDescription: "One video sent to the buyer",
        color: "gray.700",
        icon: GoMegaphone,
        isChecked: false,
        value: "videoShoutout",
      },
      {
        id: 19,
        activityTitle: "Other",
        activityDescription: "Pitch any unique offer",
        color: "gray.700",
        icon: HiDotsHorizontal,
        isChecked: false,
        value: "other",
      },
    ],
    offlineCategory: [
      {
        id: 20,
        activityTitle: "Appearance / Meet-and-Greet",
        activityDescription: "One in-person appearance at an event",
        color: "gray.700",
        icon: AiOutlineEye,
        isChecked: false,
        value: "appearanceMeetAndGreet",
      },
      {
        id: 21,
        activityTitle: "Autograph Signing",
        activityDescription: "One autograph signing session",
        color: "gray.700",
        icon: BsPen,
        isChecked: false,
        value: "autographSigning",
      },
      {
        id: 22,
        activityTitle: "Keynote Speech",
        activityDescription: "One speaking engagement at an event",
        color: "gray.700",
        icon: MdOutlineCoPresent,
        isChecked: false,
        value: "keynoteSpeech",
      },
      {
        id: 23,
        activityTitle: "Sport Demonstration",
        activityDescription: "One in-person activity demo, lesson, or clinic",
        color: "gray.700",
        icon: BiRun,
        isChecked: false,
        value: "sportDemonstration",
      },
      {
        id: 24,
        activityTitle: "Production Shoot (Photo / Video)",
        activityDescription: "One in-person photo or video shoot",
        color: "gray.700",
        icon: BsCamera,
        isChecked: false,
        value: "productionShoot",
      },
      {
        id: 25,
        activityTitle: "Product Testing & Feedback",
        activityDescription: "One product testing or feedback session",
        color: "gray.700",
        icon: BsBox,
        isChecked: false,
        value: "productTestingAndFeedback",
      },
      {
        id: 26,
        activityTitle: "In-person Interview",
        activityDescription: "One in-person interview appearance",
        color: "gray.700",
        icon: BiUserVoice,
        isChecked: false,
        value: "inPersonInterview",
      },
      {
        id: 27,
        activityTitle: "Group Marketing",
        activityDescription:
          "Multiple athlete's NIL used for a group marketing activation",
        color: "gray.700",
        icon: BsPeople,
        isChecked: false,
        value: "groupMarketing",
      },
      {
        id: 28,
        activityTitle: "Licensing",
        activityDescription: "Paying for rights to use athlete's NIL",
        color: "gray.700",
        icon: TbLicense,
        isChecked: false,
        value: "licensing",
      },
    ],
  }

  const mergedActivities = [
    ...activities.onlineOptionalCategory,
    ...activities.onlineCategory,
    ...activities.offlineCategory,
  ]
  const filterSelectedActivities = mergedActivities
    .filter((activity) =>
      selectedActivities.some((someActivity) => someActivity.id === activity.id)
    )
    .map((activity) => {
      return { ...activity, activityAmount: activity.activityAmount }
    })
  const newSelectedActivities = filterSelectedActivities.map((obj, index) => {
    return {
      ...obj,
      ...selectedActivities[index],
    }
  })
  console.log('newSelectedActivities: ', newSelectedActivities)

  return (
    <>
      <Grid
        templateAreas={`"header"
                            "main"
                            "footer"`}
        gridTemplateRows={"auto 9fr auto"}
        gridTemplateColumns={"1fr"}
        h="100vh"
        // bgColor={'#2596be'}
        // bgColor={'#E4405F'}
      >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={"header"} pb={4}>
          <Flex
            px={20}
            flexGrow={1}
            alignItems={"center"}
            borderBottom={"2px solid #EBEFF2"}
          >
            <Flex flexGrow={1} flexDirection={"column"} py={4}>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                Review
              </Text>
              <Text color={"gray.500"} fontSize={"sm"}>
                Look over all the information you have provided
              </Text>
            </Flex>
            <Flex>
            <Link to={'/network'}><Icon as={TfiClose} boxSize={4} /></Link>
            </Flex>
          </Flex>
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem
          px={"80px"}
          py={2}
          area={"main"}
          overflowY={"auto"}
          position={"relative"}
        >
          <Flex flexDirection={"column"} gap={4}>
            <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"blue.500"}
                >
                  Deal type
                </Text>
                <Text
                  cursor={"pointer"}
                  color={"blue.500"}
                  fontWeight={"semibold"}
                  onClick={() => dispatch(setActiveStep("deal_type"))}
                >
                  Edit
                </Text>
              </Flex>
              <Box py={4}>
                {/* ------ Content ------ */}
                <Flex pr={6} py={5} borderRadius={4}>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    w={"64px"}
                  >
                    <Icon
                      color={"gray.500"}
                      boxSize={6}
                      as={postType === "offer" ? TfiPencilAlt : CgMenuGridO}
                    />
                  </Flex>
                  <Box>
                    <Text fontWeight={"semibold"}>
                      {postType === "opportunity" ? "Opportunity" : "Offer"}
                    </Text>
                    <Text fontSize={"sm"}>
                      {postType === "offer"
                        ? "Offers are deals that are sent directly to one or more recipients, allowing you to target exactly who you want."
                        : "Opportunities are posted for all users in the marketplace to review and apply to, giving you the flexibility to select from a pool of applicants."}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>

            {postType === 'offer' && <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"blue.500"}
                >
                  Recipients
                </Text>
                <Text
                  cursor={"pointer"}
                  color={"blue.500"}
                  fontWeight={"semibold"}
                  onClick={() => dispatch(setActiveStep("recipients"))}
                >
                  Edit
                </Text>
              </Flex>
              <Box py={4}>
                {/* ------ Content ------ */}
                {selectedRecipients && selectedRecipients.length > 0 ? (
                  selectedRecipients.map((recipient) => {
                    const { id, firstName, lastName } = recipient
                    return (
                      <Flex key={id} sx={recipientContainer}>
                        <Avatar name={`${firstName} ${lastName}`}>
                          <AvatarBadge boxSize="0.9em" bg="green.500" />
                        </Avatar>
                        <Box pl={2}>
                          <Text
                            fontWeight={"semibold"}
                          >{`${firstName} ${lastName}`}</Text>
                          <Text fontSize={"sm"} color={"gray.500"}>
                            Student-Athlete • Tennis • Fresno State Bulldogs
                          </Text>
                        </Box>
                      </Flex>
                    )
                  })
                ) : (
                  <NoSelected category={"Recipients"} />
                )}
              </Box>
            </Box>}

            <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"blue.500"}
                >
                  Activities
                </Text>
                <Text
                  cursor={"pointer"}
                  color={"blue.500"}
                  fontWeight={"semibold"}
                  onClick={() => dispatch(setActiveStep("activities"))}
                >
                  Edit
                </Text>
              </Flex>
              <Box py={4}>
                {/* ------ Content ------ */}
                {newSelectedActivities.length > 0 ? (
                  newSelectedActivities.map((activity) => {
                    const {
                      id,
                      icon,
                      color,
                      activityTitle,
                      activityDate,
                      activityAmount,
                    } = activity
                    // const isoDateAC =
                    //   activityDate.utcFormat !== "" &&
                    //   new Date(activityDate.utcFormat).toISOString().replace(':00 ', ' ')
                    // const utcDateAc =
                    //   activityDate.utcFormat !== "" &&
                    //   new Date(isoDateAC).toUTCString().replace(':00 ', ' ').replace("GMT", "UTC")
                    return (
                      <Flex key={id} sx={recipientContainer}>
                        <Icon
                          as={icon}
                          color={color}
                          bgColor={"gray.100"}
                          boxSize={10}
                          p={2}
                        />
                        <Flex
                          pl={2}
                          justifyContent={"space-between"}
                          flexGrow={1}
                        >
                          <Box>
                            <Text fontWeight={"semibold"}>{activityTitle}</Text>
                            <Flex>
                              {activityAmount && activityAmount > 0 ? (
                                <Text
                                  fontSize={"sm"}
                                  color={"blue.500"}
                                  fontWeight={"semibold"}
                                >{`$${activityAmount}`}</Text>
                              ) : (
                                <Flex alignItems={"center"} gap={1}>
                                  <Icon
                                    as={BsExclamationTriangle}
                                    color={"red"}
                                  />
                                  <Text
                                    fontWeight={"semibold"}
                                    onClick={() =>
                                      dispatch(setActiveStep("activities"))
                                    }
                                    color={"red"}
                                    cursor={"pointer"}
                                  >
                                    amount required
                                  </Text>
                                </Flex>
                              )}
                            </Flex>
                          </Box>
                          <Box>
                            <Flex
                              alignItems={"center"}
                              justifyContent={"flex-end"}
                              gap={1}
                            >
                              <Icon
                                as={BsCircleFill}
                                boxSize={2}
                                color={"green.700"}
                              />
                              <Text fontWeight={"semibold"} textAlign={"right"}>
                                Draft
                              </Text>
                            </Flex>
                            {activityDate ? (
                              <Text
                                fontSize={"sm"}
                                color={"blue.500"}
                                fontWeight={"semibold"}
                              >
                                {activityDate.utcFormat}
                              </Text>
                            ) : (
                              <Flex alignItems={"center"} gap={1}>
                                <Icon
                                  as={BsExclamationTriangle}
                                  color={"red"}
                                />
                                <Text
                                  fontWeight={"semibold"}
                                  onClick={() =>
                                    dispatch(setActiveStep("activities"))
                                  }
                                  color={"red"}
                                  cursor={"pointer"}
                                >
                                  date required
                                </Text>
                              </Flex>
                            )}
                          </Box>
                        </Flex>
                      </Flex>
                    )
                  })
                ) : (
                  <NoSelected category={"Activities"} />
                )}
              </Box>
            </Box>

            <Box
              borderColor={"gray.200"}
              borderStyle={"solid"}
              borderWidth={"1px"}
              borderRadius={"6px"}
              p={5}
            >
              <Flex
                justifyContent={"space-between"}
                borderColor={"gray.200"}
                borderStyle={"solid"}
                borderBottomWidth={"1px"}
                pb={4}
              >
                {/* ------ Label ------ */}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"blue.500"}
                >
                  Details
                </Text>
                <Text
                  cursor={"pointer"}
                  color={"blue.500"}
                  fontWeight={"semibold"}
                  onClick={() => dispatch(setActiveStep("details"))}
                >
                  Edit
                </Text>
              </Flex>
              <Box py={4}>
                {/* ------ Content ------ */}
                {hasBrief || postTitle ? (
                  <Flex flexDirection={"column"} gap={4}>
                    {postTitle && (
                      <Box>
                        <Text fontWeight={"semibold"}>Deal Name</Text>
                        <Text>{postTitle}</Text>
                      </Box>
                    )}
                    <Box
                      maxHeight={!viewMore && "270px"}
                      overflow={"hidden"}
                      position={"relative"}
                      _after={
                        !viewMore && {
                          content: '""',
                          position: "absolute",
                          bottom: "0",
                          height: "100px",
                          width: "100%",
                          bgColor: "red",
                          zIndex: "30",
                          background:
                            "linear-gradient(0deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%)",
                        }
                      }
                    >
                      {hasBrief && (
                        <Box>
                          <Text fontWeight={"semibold"}>Brief</Text>
                          <Editor editorState={editorState} readOnly />
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <Text
                        fontWeight={"semibold"}
                        mt={viewMore && 4}
                        cursor={"pointer"}
                        color={"blue.500"}
                        onClick={() => setViewMore(() => !viewMore)}
                      >
                        {!viewMore ? "View more" : "View less"}
                      </Text>
                    </Box>
                    {Object.keys(postExpirationDate).length > 0 && (
                      <Box>
                        <Text fontWeight={"semibold"}>Expiration date</Text>
                        <Text>{postExpirationDate.utcFormat.replace(':00 ', ' ')}</Text>
                      </Box>
                    )}
                  </Flex>
                ) : (
                  <NoSelected category={"Details"} />
                )}
              </Box>
            </Box>
          </Flex>
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"} bottom={"0"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(setActiveStep("details"))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="twitter"
              onClick={() => dispatch(setActiveStep("payment"))}
            >
              Next Step
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default ReviewV1
