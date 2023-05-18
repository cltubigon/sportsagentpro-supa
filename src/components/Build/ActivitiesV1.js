import { SearchIcon } from "@chakra-ui/icons"
import { Text, Flex, Box, SimpleGrid, Button, CloseButton, Icon, Input, InputGroup, InputLeftElement, Grid, GridItem, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, setActivityAmount, updateSelectedActivities, addOrRemoveActivities } from '../../store/actions/PostActions'
import { BsAsterisk, BsBox, BsCamera, BsCheckCircleFill, BsChevronLeft, BsChevronRight, BsCurrencyDollar, BsExclamationCircle, BsExclamationCircleFill, BsHeadset, BsInstagram, BsMic, BsPen, BsPeople, BsSnapchat, BsTiktok, BsYoutube } from 'react-icons/bs'
import { TfiClose, TfiMenuAlt } from 'react-icons/tfi'
import { RxDashboard } from 'react-icons/rx'
import { BsFacebook, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { FaIcons } from 'react-icons/fa'
import { HiOutlineUserGroup, HiDotsHorizontal } from 'react-icons/hi'
import { GoMegaphone } from 'react-icons/go'
import { TbLicense } from 'react-icons/tb'
import { BiUserVoice, BiRun, BiTrash } from 'react-icons/bi'
import { MdOutlineCoPresent } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { GrFormClose } from "react-icons/gr"
import { useForm } from "react-hook-form"

const ActivitiesNav1 = () => {
    const dispatch = useDispatch()
    const reduxState = useSelector(state => state.post)
    const reduxSelectedActivity = useSelector(state => state.post.selectedActivities)
    console.log('reduxState: ', reduxState)
    
    const [count, setCount] = useState(null)
    const [tab, setTab] = useState(true)
    const [inputs, setInputs] = useState({})
    
    useEffect(()=> {
      if (reduxSelectedActivity.length !== count) {
        setCount(reduxSelectedActivity.length)
      }

      const selectedActivityIds = reduxSelectedActivity.map(activity => activity.id)
      const notSelectedKeys = Object.keys(inputs).filter(keys => !selectedActivityIds.some(id => keys === `activityAmount${id}`))
      notSelectedKeys.forEach(key => {        // remove amount of unselected activity
        if (inputs.hasOwnProperty(key)) inputs[key] = "0"
      })
    }, [reduxSelectedActivity, count])

    const handleOnChange = (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      })
    }

    useEffect(()=> {
      setInputs(reduxSelectedActivity.reduce((result, activity) => {
        if (activity.activityAmount) {
          const propertyName = `activityAmount${activity.id}`;
          result[propertyName] = activity.activityAmount;
        }
        return result;
      }, { ...inputs }))
    },[])

    console.log('inputs: ', inputs)
    useEffect(()=> {
      const hasInput = Object.keys(inputs).length === 0
      !hasInput && dispatch(updateSelectedActivities(inputs))
    },[inputs, tab])
    
    const postType = useSelector(state => state.post.postType)
    const [prevButton, setPrevButton] = useState('deal_type') 
    useEffect(()=> {
      postType === 'opportunity' ? setPrevButton('deal_type') : setPrevButton('recipients')
    }, [postType])

    const isSelected = (id) => {
      const isSelected = reduxSelectedActivity.some(data => data.id === id)
      return isSelected
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
      _hover: {
        boxShadow: 'md',
      }
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

  const inputBorder =  {
    borderColor: 'gray.500',
    borderWidth: '1px',
    borderStyle: 'solid',
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
              <Flex flexGrow={1} gap={8} pt={4} mb={tab ? 10 : 2} borderBottom={"2px solid #EBEFF2"}>
                  <Text cursor={'pointer'} onClick={()=> setTab(()=> true)} borderBottom={tab && '2px solid #000'} pb={2}>Discover</Text>
                  <Text cursor={'pointer'} onClick={()=> setTab(()=> false)} borderBottom={!tab && '2px solid #000'} pb={2}>Activity details {count > 0 && `(${count})`}</Text>
              </Flex>
            </Flex>

            {tab && <Flex px={20}>
                <InputGroup >
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input placeholder="Search activities..." border={'1px solid #89949F'} borderRadius={'50px'} />
                </InputGroup>
            </Flex>}
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem pl={'80px'} pr={'65px'} area={'main'} overflowY={'auto'} position={'relative'}>
            {tab && <Flex bgColor={'white'} pb={4} gap={4} justifyContent={'flex-end'} position={'sticky'} top={'0'}>
                <Icon as={RxDashboard} boxSize={6} />
                <Icon as={TfiMenuAlt} boxSize={6} />
            </Flex>}

            {tab && <Box pb={6}>
                <Flex pb={3}><Text fontWeight={'semibold'}>ONLINE - Optional automated publishing available</Text></Flex>
                <SimpleGrid minChildWidth='200px' spacing={4}>
                {activities.onlineOptionalCategory.map((activity) => {
                    return (
                <Flex cursor={'pointer'} key={activity.id} sx={itemContainerStyle} onClick={()=> dispatch(addOrRemoveActivities(activity))} bgColor={isSelected(activity.id) && 'blue.100'} border={isSelected(activity.id) ? '1px solid #90CDF4' : '1px solid transparent'} >
                    <Icon as={activity.icon} color={activity.color} sx={itemsIconStyle} />
                    <Text sx={itemTitleStyle}>{activity.activityTitle}</Text>
                    <Text sx={itemDescStyle}>{activity.activityDescription}</Text>
                </Flex>
                    )
                })}
                </SimpleGrid>
            </Box>}
            {tab && <Box pb={6}>
                <Flex pb={3}><Text fontWeight={'semibold'}>ONLINE - Optional automated publishing available</Text></Flex>                    
                <SimpleGrid minChildWidth='200px' spacing={4}>
                {activities.onlineCategory.map((activity) => {
                    return (
                <Flex cursor={'pointer'} key={activity.id} sx={itemContainerStyle} onClick={()=> dispatch(addOrRemoveActivities(activity))} bgColor={isSelected(activity.id) && 'blue.100'} border={isSelected(activity.id) ? '1px solid #90CDF4' : '1px solid transparent'} >
                    <Icon as={activity.icon} color={activity.color} sx={itemsIconStyle} />
                    <Text sx={itemTitleStyle}>{activity.activityTitle}</Text>
                    <Text sx={itemDescStyle}>{activity.activityDescription}</Text>
                </Flex>
                    )
                })}
                </SimpleGrid>
            </Box>}

            {tab && <Box pb={6}>
                <Flex pb={3}><Text fontWeight={'semibold'}>ONLINE - Optional automated publishing available</Text></Flex>                    
                <SimpleGrid minChildWidth='200px' spacing={4}>
                {activities.offlineCategory.map((activity) => {
                    return (
                <Flex cursor={'pointer'} key={activity.id} sx={itemContainerStyle} onClick={()=> dispatch(addOrRemoveActivities(activity))} bgColor={isSelected(activity.id) && 'blue.100'} border={isSelected(activity.id) ? '1px solid #90CDF4' : '1px solid transparent'} >
                    <Icon as={activity.icon} color={activity.color} sx={itemsIconStyle} />
                    <Text sx={itemTitleStyle}>{activity.activityTitle}</Text>
                    <Text sx={itemDescStyle}>{activity.activityDescription}</Text>
                </Flex>
                    )
                })}
                </SimpleGrid>
            </Box>}

            {/* -------------------------------------- Tab 2 -------------------------------------- */}
            {!tab && <Flex pb={6} flexDirection={'column'} gap={4}>
              {reduxSelectedActivity.map((activity)=> {
                return (
                  <Flex key={activity.id} flexDirection={'column'} borderColor={'gray.300'} borderWidth={'1px'} borderStyle={'solid'} borderRadius={'6px'} >
                    <Flex flexGrow={1} justifyContent={'space-between'} p={2} borderBottom={'1px solid #EBEFF2'}>
                      <Flex alignItems={'flex-start'} gap={2}>
                        <Icon as={activity.activityAmount > 0 ? BsCheckCircleFill : BsExclamationCircleFill} color={activity.activityAmount > 0 ? 'green.500' : 'gray.500'} mt={'8px'} boxSize={4} />
                        <Box>
                          <Text fontSize={'xl'} fontWeight={'semibold'}>{activity.activityTitle}</Text>
                          {activity.activityAmount > 0 && <Text fontSize={'sm'} color={"green.700"}>{`$${parseInt(activity.activityAmount).toLocaleString()}.00`}</Text>}
                        </Box>
                      </Flex>
                      <Flex alignItems={'center'}>
                        <Icon as={BiTrash} boxSize={5} color={'blue.400'} cursor={'pointer'} onClick={()=> dispatch(addOrRemoveActivities(activity))} />
                      </Flex>
                    </Flex>
                    

                    <Flex flexGrow={1} flexDirection={'column'} justifyContent={'space-between'} p={2} borderBottom={'1px solid #EBEFF2'}>
                      <Text color={'gray.400'} fontWeight={'semibold'} >Payment</Text>
                      <Flex>
                        <Text color={'red'} fontWeight={'semibold'} fontSize={'sm'} >*</Text>
                        <Text color={'gray.700'} fontWeight={'semibold'} fontSize={'sm'}>Amount</Text>
                      </Flex>
                      <Text fontSize={'xs'}>Amount to be paid for the activity</Text>
                      <InputGroup my={2} >
                        <InputLeftElement pt={1} pointerEvents="none" color={'gray.800'} children={<BsCurrencyDollar />} />
                          <NumberInput name={`activityAmount${activity.id}`} defaultValue={activity.activityAmount > 0 && activity.activityAmount} precision={2}>
                            <NumberInputField sx={inputBorder} placeholder="0.00" pl={7} onChange={handleOnChange} />
                          </NumberInput>
                      </InputGroup>
                    </Flex>

                    <Flex flexGrow={1} flexDirection={'column'} justifyContent={'space-between'} p={2} borderBottom={'1px solid #EBEFF2'}>
                      <Text color={'gray.400'} fontWeight={'semibold'} >Due date</Text>
                      <Flex>
                        <Text color={'red'} fontWeight={'semibold'} fontSize={'sm'} >*</Text>
                        <Text color={'gray.700'} fontWeight={'semibold'} fontSize={'sm'}>Date and time</Text>
                      </Flex>
                      <Text fontSize={'xs'}>Date and time activity is to be completed by</Text>
                      <InputGroup>
                        <Input maxW={'300px'} sx={inputBorder} my={2} placeholder="Select Date and Time" size="md" type="datetime-local" />
                      </InputGroup>
                    </Flex>
                    
                    <Flex px={2} onClick={()=> dispatch(addOrRemoveActivities(activity))} alignItems={'center'} gap={1} pb={2} cursor={'pointer'} color={'blue.400'}><Icon as={BiTrash} boxSize={4} cursor={'pointer'} />
                      <Text>Remove activity</Text>
                    </Flex>
                    
                  </Flex>
                )
              })}
            </Flex>}
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