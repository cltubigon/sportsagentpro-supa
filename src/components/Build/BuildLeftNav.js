import { CheckIcon } from "@chakra-ui/icons"
import { Stack, Heading, Text, Box, Icon, Flex, Tooltip} from "@chakra-ui/react"
import {BsArrowBarLeft, BsArrowBarRight, BsCircleFill} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux"
import { setActiveStep } from "../../store/actions/PostActions"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MdSupport } from "react-icons/md"
import { duration } from "moment/moment"

const BuildLeftNav = () => {
    const dispatch = useDispatch()
    // const activeStep = useSelector(state => state.post.activeStep)
    const statePost = useSelector(state => state.post)
    const { postType, selectedActivities, activitiesTabReady, activeStep, selectedRecipientsCount, detailsTabReady, reviewTabReady, paymentTabReady } = statePost
    
    const countActivities = selectedActivities.length
    // const selectedRecipientsCount = useSelector(state => state.post.selectedRecipientsCount)

    const stepTwoCompleted = statePost.recipients && statePost.recipients.some(recipient => recipient.isChecked)

    const [collapse, setCollapse] = useState(false)
    const [paymentReady, setPaymentReady] = useState(null)

    useEffect(()=> {
        (postType === 'offer' &&
        selectedRecipientsCount > 0 &&
        activitiesTabReady &&
        detailsTabReady ||
        postType === 'opportunity' &&
        activitiesTabReady &&
        detailsTabReady) ?
        setPaymentReady(true) :
        setPaymentReady(false)
    }, [statePost])
    
    const menuTitleStyle = {
        fontSize: 'md',
    }
    const menuDescStyle = {
        fontSize: 'xs',
    }
    const numberStyle = {
        fontSize: 'sm',
        fontWeight: 'semibold',
    }
    const circleContainerStyle = {
        w: '24px',
        h: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        border: '1px solid #1A202C',
    }
    const selectedcircleContainerStyle = {
        w: '24px',
        h: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        border: '1px solid #1A202C',
        bg: '#1A202C',
        color: '#fff',
    }
    const completedCircleStyle = {
        w: '24px',
        h: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        border: '1px solid #3182CE',
        bg: '#3182CE',
        color: '#fff',
    }
    const selectedMenuTitleStyle = {
        fontSize: 'md',
        fontWeight: 'semibold',
    }
    const selectedMenuDescStyle = {
        fontSize: 'xs',
        fontWeight: 'semibold',
    }
    const menuContainer = {
        cursor: 'pointer',
        position: 'relative',
    }
    const navContainer = {
        gap: collapse ? 8 : 5,
        py:5,
        alignItems: collapse ? 'center' : 'flex-start',
    }
    
    const animateSidebar = () => {
        setCollapse(()=> !collapse)
    }
    const parentContainer = {
        initial: { width: '290px' },
        animate: { width: !collapse ? '290px' : '80px', transition: { duration: 0.3 } },
    }
  return (
    <>
      <Flex as={motion.div} variants={parentContainer} initial={'initial'} animate={'animate'} flexDirection={'column'} justifyContent={'space-between'} alignItems={collapse ? 'center' : 'flex-start'} bgColor={'gray.200'} height={'100vh'} px={5} pb={6} >
        <Flex flexDirection={'column'} width={'100%'}>
            <Link to={'/'}><Heading fontSize={!collapse ? '3xl' : 'xl'} pt={5} pb={!collapse ? 5 : 2} >SPA</Heading></Link>
            {!collapse &&
            <Box py={5} borderBottom={'1px solid #D0D4D9'} borderTop={'1px solid #D0D4D9'}>
                <Text fontWeight={'semibold'} fontSize={'sm'} >Current deal status</Text>
                <Flex alignItems={'center'} gap={3}>
                    <Icon as={BsCircleFill} boxSize={2} color={"blue.500"} />
                    <Text fontSize={'sm'}>Draft</Text>
                </Flex>
            </Box>}
            
            <Stack sx={navContainer}>

                <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('deal_type'))}>
                    <Flex sx={activeStep === 'deal_type' ? selectedcircleContainerStyle : (statePost.postType ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: !collapse ? '46px' : '40px', width: '2px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                        {activeStep === 'deal_type' ? <Icon as={CheckIcon} boxSize={3} /> : (statePost.postType ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>1</Text>)}
                    </Flex>
                    {!collapse && <Box>
                        <Text sx={activeStep === 'deal_type' ? selectedMenuTitleStyle : menuTitleStyle}>Deal Type</Text>
                        <Text sx={activeStep === 'deal_type' ? selectedMenuDescStyle : menuDescStyle}>{statePost.postType ? 'Completed' : 'Incomplete'}</Text>
                    </Box>}
                </Flex>

                {statePost.postType !== 'opportunity' && <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('recipients'))}>
                    <Flex sx={activeStep === 'recipients' ? selectedcircleContainerStyle : (stepTwoCompleted ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: !collapse ? '46px' : '40px', width: '2px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                        {activeStep === 'recipients' ? <Icon as={CheckIcon} boxSize={3} /> : (stepTwoCompleted ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>2</Text>)}
                    </Flex>
                    {!collapse && <Box>
                        <Text sx={activeStep === 'recipients' ? selectedMenuTitleStyle : menuTitleStyle}>Recipients {selectedRecipientsCount > 0 && `(${selectedRecipientsCount})`}</Text>
                        <Text sx={activeStep === 'recipients' ? selectedMenuDescStyle : menuDescStyle}>{stepTwoCompleted ? 'Completed' : 'Incomplete'}</Text>
                    </Box>}
                </Flex>}

                <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('activities'))}>
                    <Flex sx={activeStep === 'activities' ? selectedcircleContainerStyle : (activitiesTabReady ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: !collapse ? '46px' : '40px', width: '2px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                        {activeStep === 'activities' ? <Icon as={CheckIcon} boxSize={3} /> : (activitiesTabReady ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '3' : '2'}</Text>)}
                    </Flex>
                    {!collapse && <Box>
                        <Text sx={activeStep === 'activities' ? selectedMenuTitleStyle : menuTitleStyle}>Activities {countActivities > 0 && `(${countActivities})`}</Text>
                        <Text sx={activeStep === 'activities' ? selectedMenuDescStyle : menuDescStyle}>{activitiesTabReady ? 'Completed' : 'Incomplete'}</Text>
                    </Box>}
                </Flex>

                <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('details'))}>
                    <Flex sx={activeStep === 'details' ? selectedcircleContainerStyle : (detailsTabReady ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: !collapse ? '46px' : '40px', width: '2px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                        {activeStep === 'details' ? <Icon as={CheckIcon} boxSize={3} /> : (detailsTabReady ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '4' : '3'}</Text>)}
                    </Flex>
                    {!collapse && <Box>
                        <Text sx={activeStep === 'details' ? selectedMenuTitleStyle : menuTitleStyle}>Details</Text>
                        <Text sx={activeStep === 'details' ? selectedMenuDescStyle : menuDescStyle}>{detailsTabReady ? 'Completed' : 'Incomplete'}</Text>
                    </Box>}
                </Flex>


                <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('review'))}>
                    <Flex sx={activeStep === 'review' ? selectedcircleContainerStyle : (reviewTabReady ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: !collapse ? '46px' : '40px', width: '2px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                        {activeStep === 'review' ? <Icon as={CheckIcon} boxSize={3} /> : (reviewTabReady ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '5' : '4'}</Text>)}
                    </Flex>
                    {!collapse && <Box>
                        <Text sx={activeStep === 'review' ? selectedMenuTitleStyle : menuTitleStyle}>Review</Text>
                        <Text sx={activeStep === 'review' ? selectedMenuDescStyle : menuDescStyle}>{reviewTabReady ? 'Completed' : 'Incomplete'}</Text>
                    </Box>}
                </Flex>

                <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('payment'))}>
                    <Flex sx={activeStep === 'payment' ? selectedcircleContainerStyle : (paymentReady ? completedCircleStyle : circleContainerStyle)}>
                        {activeStep === 'payment' ? <Icon as={CheckIcon} boxSize={3} /> : (paymentReady ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '6' : '5'}</Text>)}
                    </Flex>
                    {!collapse && <Box>
                        <Text sx={activeStep === 'payment' ? selectedMenuTitleStyle : menuTitleStyle}>Payment</Text>
                        <Text sx={activeStep === 'payment' ? selectedMenuDescStyle : menuDescStyle}>{paymentReady ? 'Completed' : 'Incomplete'}</Text>
                    </Box>}
                </Flex>

            </Stack>
        </Flex>
        <Flex gap={4} flexDirection={!collapse ? 'row' : 'column' } justifyContent={!collapse && "space-between"} width={!collapse && '100%'}>
            <Tooltip hasArrow label='Contact support team' color='gray.400'>
                <Box>
                    <Icon as={MdSupport} boxSize={6}/>
                </Box>
            </Tooltip>
            <Tooltip hasArrow label='Expand' color='gray.400'>
                <Box>
                    {collapse && <Icon as={BsArrowBarRight} boxSize={6} onClick={animateSidebar} />}
                </Box>
            </Tooltip>
            <Tooltip hasArrow label='Collapse' color='gray.400'>
                <Box>
                    {!collapse && <Icon as={BsArrowBarLeft} boxSize={6} onClick={animateSidebar} />}
                </Box>
            </Tooltip>
        </Flex>
      </Flex>
    </>
  )
}

export default BuildLeftNav