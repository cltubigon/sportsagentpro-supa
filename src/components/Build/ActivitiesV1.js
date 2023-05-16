import { SearchIcon } from "@chakra-ui/icons"
import { Text, Flex, Box, SimpleGrid, Button, CloseButton, Icon, Input, InputGroup, InputLeftElement, Grid, GridItem } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, selectedActivities } from '../../store/actions/PostActions'
import { BsBox, BsCamera, BsChevronLeft, BsChevronRight, BsHeadset, BsInstagram, BsMic, BsPen, BsPeople, BsSnapchat, BsTiktok, BsYoutube } from 'react-icons/bs'
import { TfiClose, TfiMenuAlt } from 'react-icons/tfi'
import { RxDashboard } from 'react-icons/rx'
import { BsFacebook, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { FaIcons } from 'react-icons/fa'
import { HiOutlineUserGroup, HiDotsHorizontal } from 'react-icons/hi'
import { GoMegaphone } from 'react-icons/go'
import { TbLicense } from 'react-icons/tb'
import { BiUserVoice, BiRun } from 'react-icons/bi'
import { MdOutlineCoPresent } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { GrFormClose } from "react-icons/gr"

const ActivitiesNav1 = () => {

    const dispatch = useDispatch()
    const reduxSelectedActivity = useSelector(state => state.post.selectedActivities)
    console.log('reduxSelectedActivity: ', reduxSelectedActivity)
  
    const postType = useSelector(state => state.post.postType)
    const [prevButton, setPrevButton] = useState('deal_type')  
    useEffect(()=> {
      postType === 'opportunity' ? setPrevButton('deal_type') : setPrevButton('recipients')
    }, [postType])
  
    const contentContainer = {
      my: 4,
      flexDirection: 'column',
      gap: 4,
      overflowY: 'auto',
    }
    const itemsIconStyle = {
      boxSize: 10,
      textAlign: 'center',
      mb: 2,
    }
    const itemDescStyle = {
      fontSize: 'xs',
      color: 'gray.500',
      textAlign: 'center',
    }
    const itemTitleStyle = {
      fontWeight: 'semibold',
      textAlign: 'center',
    }
    const itemContainerStyle = {
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      p: 3,
      borderRadius: '6px',
      border: '1px solid transparent',
      _hover: {
        border: '1px solid #EBEFF2'
      }
    }
    const navContainerStyle = {
        justifyContent: "space-between",
        flexGrow: 1,
        py: 5,
        px: 20,
        borderBottom: "2px solid #EBEFF2",
      }
      const subMenuContainer = {
        justifyContent: "space-between",
        flexGrow: 1,
        pt: 5,
        pb: 2,
        px: 20,
        flexDirection: 'column',
      }
  
    const activities = {
      onlineOptionalCategory: [
      {
        id: 17,
        activityTitle: 'Twitter Post',
        activityDescription: 'One tweet with text or media',
        color: '#1CA1F2',
        icon: BsTwitter,
        isChecked: false,
        value: 'twitterPost',
      },
      {
        id: 18,
        activityTitle: 'Twitter Video Monetization',
        activityDescription: "Videos added to Twitter's video monetization program",
        color: '#1CA1F2',
        icon: BsTwitter,
        isChecked: false,
        value: 'twitterVideoMonetization',
      },
      {
        id: 19,
        activityTitle: 'Facebook Post',
        activityDescription: 'One page post with text or media',
        color: '#1877F2',
        icon: BsFacebook,
        isChecked: false,
        value: 'facebookPost',
      },
      {
        id: 20,
        activityTitle: 'LinkedIn Post',
        activityDescription: 'One timeline post with text or media',
        color: '#0077B7',
        icon: BsLinkedin,
        isChecked: false,
        value: '',
      },
    ],
    onlineCategory: [
      {
        id: 1,
        activityTitle: 'Twitter Video Monetization',
        activityDescription: "Videos added to Twitter's video monetization program",
        color: '#1CA1F2',
        icon: BsTwitter,
        isChecked: false,
        value: 'twitterVideoMonetization',
      },
      {
        id: 2,
        activityTitle: 'Instagram Post',
        activityDescription: 'One photo, video, or carousel post shared to profile',
        color: '#E4405F',
        icon: BsInstagram,
        isChecked: false,
        value: 'instagramPost',
      },
      {
        id: 3,
        activityTitle: 'Instagram Story',
        activityDescription: 'One story that stays live for 24 hours. Specify # of frames',
        color: '#E4405F',
        icon: BsInstagram,
        isChecked: false,
        value: 'instagramStory',
      },
      {
        id: 4,
        activityTitle: 'Instagram Reels',
        activityDescription: 'One original video shared as a Reel',
        color: '#E4405F',
        icon: BsInstagram,
        isChecked: false,
        value: 'instagramReels',
      },
      {
        id: 5,
        activityTitle: 'Facebook Story',
        activityDescription: 'One story that stays live for 24 hours on public FB page',
        color: '#1877F2',
        icon: BsFacebook,
        isChecked: false,
        value: 'facebookStory',
      },
      {
        id: 6,
        activityTitle: 'Facebook Live',
        activityDescription: 'One live Facebook broadcast at a dedicated time',
        color: '#1877F2',
        icon: BsFacebook,
        isChecked: false,
        value: 'facebookLive',
      },
      {
        id: 7,
        activityTitle: 'YouTube Post',
        activityDescription: "One video uploaded to a user's channel",
        color: '#FF0300',
        icon: BsYoutube,
        isChecked: false,
        value: 'youtubePost',
      },
      {
        id: 8,
        activityTitle: 'TikTok Post',
        activityDescription: "One original video posted to a user's profile",
        color: 'gray.700',
        icon: BsTiktok,
        isChecked: false,
        value: 'tiktokPost',
      },
      {
        id: 9,
        activityTitle: 'Snapchat Story',
        activityDescription: 'One Snapchat story',
        color: '#FFFC00',
        icon: BsSnapchat,
        isChecked: false,
        value: 'snapchatStory',
      },
      {
        id: 10,
        activityTitle: 'Snapchat Spotlight',
        activityDescription: 'One Snapchat spotlight',
        color: '#FFFC00',
        icon: BsSnapchat,
        isChecked: false,
        value: 'snapchatSpotlight',
      },
      {
        id: 11,
        activityTitle: 'Group Licensing',
        activityDescription: 'One Snapchat spotlight',
        color: 'gray.700',
        icon: HiOutlineUserGroup,
        isChecked: false,
        value: 'groupLicensing',
      },
      {
        id: 12,
        activityTitle: 'Podcast Appearance',
        activityDescription: 'One video or audio podcast appearance',
        color: 'gray.700',
        icon: BsMic,
        isChecked: false,
        value: 'podcastAppearance',
      },
      {
        id: 13,
        activityTitle: 'Digital Press Interview',
        activityDescription: 'One online video or audio interview',
        color: 'gray.700',
        icon: BsHeadset,
        isChecked: false,
        value: 'digitalPressInterview',
      },
      {
        id: 14,
        activityTitle: 'Photo / Video / Audio Creation',
        activityDescription: 'One piece of custom photo, video, or audio content',
        color: 'gray.700',
        icon: FaIcons,
        isChecked: false,
        value: 'photoVideoAudioCreation',
      },
      {
        id: 15,
        activityTitle: 'Video Shoutout',
        activityDescription: 'One video sent to the buyer',
        color: 'gray.700',
        icon: GoMegaphone,
        isChecked: false,
        value: 'videoShoutout',
      },
      {
        id: 16,
        activityTitle: 'Other',
        activityDescription: 'Pitch any unique offer',
        color: 'gray.700',
        icon: HiDotsHorizontal,
        isChecked: false,
        value: 'other',
      },
    ],
    offlineCategory: [
      {
        id: 21,
        activityTitle: 'Appearance / Meet-and-Greet',
        activityDescription: 'One in-person appearance at an event',
        color: 'gray.700',
        icon: AiOutlineEye,
        isChecked: false,
        value: 'appearanceMeetAndGreet',
      },
      {
        id: 22,
        activityTitle: 'Autograph Signing',
        activityDescription: 'One autograph signing session',
        color: 'gray.700',
        icon: BsPen,
        isChecked: false,
        value: 'autographSigning',
      },
      {
        id: 23,
        activityTitle: 'Keynote Speech',
        activityDescription: 'One speaking engagement at an event',
        color: 'gray.700',
        icon: MdOutlineCoPresent,
        isChecked: false,
        value: 'keynoteSpeech',
      },
      {
        id: 24,
        activityTitle: 'Sport Demonstration',
        activityDescription: 'One in-person activity demo, lesson, or clinic',
        color: 'gray.700',
        icon: BiRun,
        isChecked: false,
        value: 'sportDemonstration',
      },
      {
        id: 25,
        activityTitle: 'Production Shoot (Photo / Video)',
        activityDescription: 'One in-person photo or video shoot',
        color: 'gray.700',
        icon: BsCamera,
        isChecked: false,
        value: 'productionShoot',
      },
      {
        id: 26,
        activityTitle: 'Product Testing & Feedback',
        activityDescription: 'One product testing or feedback session',
        color: 'gray.700',
        icon: BsBox,
        isChecked: false,
        value: 'productTestingAndFeedback',
      },
      {
        id: 27,
        activityTitle: 'In-person Interview',
        activityDescription: 'One in-person interview appearance',
        color: 'gray.700',
        icon: BiUserVoice,
        isChecked: false,
        value: 'inPersonInterview',
      },
      {
        id: 28,
        activityTitle: 'Group Marketing',
        activityDescription: "Multiple athlete's NIL used for a group marketing activation",
        color: 'gray.700',
        icon: BsPeople,
        isChecked: false,
        value: 'groupMarketing',
      },
      {
        id: 29,
        activityTitle: 'Licensing',
        activityDescription: "Paying for rights to use athlete's NIL",
        color: 'gray.700',
        icon: TbLicense,
        isChecked: false,
        value: 'licensing',
      },
    ]
  }
  return (
    <>
        <Grid
            templateAreas={`"header"
                            "main"
                            "footer"`}
            gridTemplateRows={'2fr 9fr auto'}
            gridTemplateColumns={'1fr'}
            h='100vh'
            >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={'header'} pb={4}>
            <Flex px={20} flexGrow={1} alignItems={'center'} borderBottom={"2px solid #EBEFF2"}>
                <Flex flexGrow={1} flexDirection={'column'} py={4} >
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Activities</Text>
                    <Text color={"gray.500"} fontSize={'sm'}>Select which activities recipients will be required to complete</Text>
                </Flex>
                <Flex>
                    <Icon as={TfiClose} boxSize={4} />
                </Flex>
            </Flex>

            <Flex px={20}>
                <Flex flexGrow={1} gap={8} pt={4} mb={10} borderBottom={"2px solid #EBEFF2"}>
                    <Text borderBottom={'2px solid #000'} pb={2}>Discover</Text>
                    <Text>Activity details</Text>
                </Flex>
            </Flex>

            <Flex px={20}>
                <InputGroup >
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input placeholder="Search activities..." border={'1px solid #89949F'} borderRadius={'50px'} />
                </InputGroup>
            </Flex>
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem pl={'80px'} pr={'65px'} area={'main'} overflowY={'auto'} position={'relative'}>
            <Flex bgColor={'white'} pb={4} gap={4} justifyContent={'flex-end'} position={'sticky'} top={'0'}>
                <Icon as={RxDashboard} boxSize={6} />
                <Icon as={TfiMenuAlt} boxSize={6} />
            </Flex>

            <Box pb={6}>
                <Flex pb={3}><Text fontWeight={'semibold'}>ONLINE - Optional automated publishing available</Text></Flex>                    
                <SimpleGrid minChildWidth='200px' spacing={4}>
                {activities.onlineOptionalCategory.map((activity) => {
                    return (
                <Flex key={activity.id} sx={itemContainerStyle} onClick={()=> dispatch(selectedActivities(activity))}>
                    <Icon as={activity.icon} color={activity.color} sx={itemsIconStyle} />
                    <Text sx={itemTitleStyle}>{activity.activityTitle}</Text>
                    <Text sx={itemDescStyle}>{activity.activityDescription}</Text>
                </Flex>
                    )
                })}
                </SimpleGrid>
            </Box>

            <Box pb={6}>
                <Flex pb={3}><Text fontWeight={'semibold'}>ONLINE - Optional automated publishing available</Text></Flex>                    
                <SimpleGrid minChildWidth='200px' spacing={4}>
                {activities.onlineCategory.map((activity) => {
                    return (
                <Flex key={activity.id} sx={itemContainerStyle} onClick={()=> dispatch(selectedActivities(activity))}>
                    <Icon as={activity.icon} color={activity.color} sx={itemsIconStyle} />
                    <Text sx={itemTitleStyle}>{activity.activityTitle}</Text>
                    <Text sx={itemDescStyle}>{activity.activityDescription}</Text>
                </Flex>
                    )
                })}
                </SimpleGrid>
            </Box>

            <Box pb={6}>
                <Flex pb={3}><Text fontWeight={'semibold'}>ONLINE - Optional automated publishing available</Text></Flex>                    
                <SimpleGrid minChildWidth='200px' spacing={4}>
                {activities.offlineCategory.map((activity) => {
                    return (
                <Flex key={activity.id} sx={itemContainerStyle} onClick={()=> dispatch(selectedActivities(activity))}>
                    <Icon as={activity.icon} color={activity.color} sx={itemsIconStyle} />
                    <Text sx={itemTitleStyle}>{activity.activityTitle}</Text>
                    <Text sx={itemDescStyle}>{activity.activityDescription}</Text>
                </Flex>
                    )
                })}
                </SimpleGrid>
            </Box>
        </GridItem>

                {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={'footer'}>
            <Flex justifyContent={'space-between'}>
                <Button leftIcon={<BsChevronLeft />} onClick={()=> dispatch(setActiveStep(prevButton))}>Previous Step</Button>
                <Button rightIcon={<BsChevronRight />} colorScheme='twitter' onClick={()=> dispatch(setActiveStep('details'))}>Next Step</Button>
            </Flex>
        </GridItem>
        </Grid>
    </>
  )
}

export default ActivitiesNav1