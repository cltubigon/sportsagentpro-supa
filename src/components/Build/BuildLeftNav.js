import { CheckIcon } from "@chakra-ui/icons"
import { Stack, Heading, Text, Box, Icon, Flex} from "@chakra-ui/react"
import {BsCircleFill} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux"
import { setActiveStep } from "../../store/actions/PostActions"
import { Link } from "react-router-dom"

const BuildLeftNav = () => {
    const dispatch = useDispatch()
    // const activeStep = useSelector(state => state.post.activeStep)
    const statePost = useSelector(state => state.post)
    const { selectedActivities, activitiesTabReady, activeStep, selectedRecipientsCount } = statePost
    // const selectedActivities = useSelector(state => state.post.selectedActivities)
    
    const countActivities = selectedActivities.length
    // const selectedRecipientsCount = useSelector(state => state.post.selectedRecipientsCount)

    const stepTwoCompleted = statePost.recipients && statePost.recipients.some(recipient => recipient.isChecked)
    
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
        gap:5,
        py:5,
    }
  return (
    <>
      <Box minW={"290px"} bg={"gray.200"} px={5}>
        <Link to={'/'}><Heading fontSize={'3xl'} py={5} >SPA</Heading></Link>
        <Box py={5} borderBottom={'1px solid #D0D4D9'} borderTop={'1px solid #D0D4D9'}>
            <Text fontWeight={'semibold'} fontSize={'sm'} >Current deal status</Text>
            <Flex alignItems={'center'} gap={3}>
                <Icon as={BsCircleFill} boxSize={2} color={"blue.500"} />
                <Text fontSize={'sm'}>Draft</Text>
            </Flex>
        </Box>
        
        <Stack sx={navContainer} >

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('deal_type'))}>
                <Flex sx={activeStep === 'deal_type' ? selectedcircleContainerStyle : (statePost.postType ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: '46px', width: '3px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                    {activeStep === 'deal_type' ? <Icon as={CheckIcon} boxSize={3} /> : (statePost.postType ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>1</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'deal_type' ? selectedMenuTitleStyle : menuTitleStyle}>Deal Type</Text>
                    <Text sx={activeStep === 'deal_type' ? selectedMenuDescStyle : menuDescStyle}>{statePost.postType ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>

            {statePost.postType !== 'opportunity' && <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('recipients'))}>
                <Flex sx={activeStep === 'recipients' ? selectedcircleContainerStyle : (stepTwoCompleted ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: '46px', width: '3px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                    {activeStep === 'recipients' ? <Icon as={CheckIcon} boxSize={3} /> : (stepTwoCompleted ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>2</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'recipients' ? selectedMenuTitleStyle : menuTitleStyle}>Recipients {selectedRecipientsCount > 0 && `(${selectedRecipientsCount})`}</Text>
                    <Text sx={activeStep === 'recipients' ? selectedMenuDescStyle : menuDescStyle}>{stepTwoCompleted ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>}

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('activities'))}>
                <Flex sx={activeStep === 'activities' ? selectedcircleContainerStyle : (activitiesTabReady ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: '46px', width: '3px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                    {activeStep === 'activities' ? <Icon as={CheckIcon} boxSize={3} /> : (activitiesTabReady ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '3' : '2'}</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'activities' ? selectedMenuTitleStyle : menuTitleStyle}>Activities {countActivities > 0 && `(${countActivities})`}</Text>
                    <Text sx={activeStep === 'activities' ? selectedMenuDescStyle : menuDescStyle}>{activitiesTabReady ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('details'))}>
                <Flex sx={activeStep === 'details' ? selectedcircleContainerStyle : (statePost.details ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: '46px', width: '3px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                    {activeStep === 'details' ? <Icon as={CheckIcon} boxSize={3} /> : (statePost.details ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '4' : '3'}</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'details' ? selectedMenuTitleStyle : menuTitleStyle}>Details</Text>
                    <Text sx={activeStep === 'details' ? selectedMenuDescStyle : menuDescStyle}>{statePost.details ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>


            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('review'))}>
                <Flex sx={activeStep === 'review' ? selectedcircleContainerStyle : (statePost.review ? completedCircleStyle : circleContainerStyle)} _before={{ position: 'absolute !important', height: '46px', width: '3px', top: '24px', backgroundColor: '#D0D4D9', content: '""', zIndex: 9,}} >
                    {activeStep === 'review' ? <Icon as={CheckIcon} boxSize={3} /> : (statePost.review ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '5' : '4'}</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'review' ? selectedMenuTitleStyle : menuTitleStyle}>Review</Text>
                    <Text sx={activeStep === 'review' ? selectedMenuDescStyle : menuDescStyle}>{statePost.review ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('payment'))}>
                <Flex sx={activeStep === 'payment' ? selectedcircleContainerStyle : (statePost.payment ? completedCircleStyle : circleContainerStyle)}>
                    {activeStep === 'payment' ? <Icon as={CheckIcon} boxSize={3} /> : (statePost.payment ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>{statePost.postType !== 'opportunity' ? '6' : '5'}</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'payment' ? selectedMenuTitleStyle : menuTitleStyle}>Payment</Text>
                    <Text sx={activeStep === 'payment' ? selectedMenuDescStyle : menuDescStyle}>{statePost.payment ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>

        </Stack>
      </Box>
    </>
  )
}

export default BuildLeftNav
// import { CheckIcon } from "@chakra-ui/icons"
// import { Stack, Heading, Text, Box, Icon, Flex} from "@chakra-ui/react"
// import {BsCircleFill} from 'react-icons/bs'
// import { useDispatch, useSelector } from "react-redux"
// import { setActiveStep } from "../../store/actions/PostActions"

// const BuildLeftNav = () => {
//     const dispatch = useDispatch()
//     const activeStep = useSelector(state => state.post.activeStep)
//     const statePost = useSelector(state => state.post)
//     console.log('statePost: ', statePost)
//     const menuTitleStyle = {
//         fontSize: 'md',
//     }
//     const menuDescStyle = {
//         fontSize: 'xs',
//     }
//     const circleContainerStyle = {
//         w: '24px',
//         h: '24px',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: '50px',
//         border: '1px solid #1A202C',
//     }
//     const numberStyle = {
//         fontSize: 'sm',
//         fontWeight: 'semibold',
//     }
//     const selectedcircleContainerStyle = {
//         w: '24px',
//         h: '24px',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: '50px',
//         border: '1px solid #1A202C',
//         bg: '#1A202C',
//         color: '#fff',
//     }
//     const completedCircleStyle = {
//         w: '24px',
//         h: '24px',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: '50px',
//         border: '1px solid #3182CE',
//         bg: '#3182CE',
//         color: '#fff',
//     }
//     const selectedMenuTitleStyle = {
//         fontSize: 'md',
//         fontWeight: 'semibold',
//     }
//     const selectedMenuDescStyle = {
//         fontSize: 'xs',
//         fontWeight: 'semibold',
//     }
//     const menuContainer = {
//         cursor: 'pointer',
//     }
//   return (
//     <>
//       <Box minW={"290px"} bg={"gray.200"} px={5}>
//         <Heading fontSize={'3xl'} py={5} >SPA</Heading>
//         <Box py={5} borderBottom={'1px solid #D0D4D9'} borderTop={'1px solid #D0D4D9'}>
//             <Text fontWeight={'semibold'} fontSize={'sm'} >Current deal status</Text>
//             <Flex alignItems={'center'} gap={3}>
//                 <Icon as={BsCircleFill} boxSize={2} color={"blue.500"} />
//                 <Text fontSize={'sm'}>Draft</Text>
//             </Flex>
//         </Box>
        
//         <Stack gap={5} py={5}>

//             <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('deal_type'))}>
//                 <Flex sx={activeStep === 'deal_type' ? selectedcircleContainerStyle : (statePost.postType ? completedCircleStyle : circleContainerStyle)}>
//                     {activeStep === 'deal_type' ? <Icon as={CheckIcon} boxSize={3} /> : (statePost.postType ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>1</Text>)}
//                 </Flex>
//                 <Box>
//                     <Text sx={activeStep === 'deal_type' ? selectedMenuTitleStyle : menuTitleStyle}>Deal Type</Text>
//                     <Text sx={activeStep === 'deal_type' ? selectedMenuDescStyle : menuDescStyle}>{statePost.postType ? 'Completed' : 'Incomplete'}</Text>
//                 </Box>
//             </Flex>

//             <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('recipients'))}>
//                 <Flex sx={activeStep === 'recipients' ? selectedcircleContainerStyle : circleContainerStyle}>
//                     {activeStep === 'recipients' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>2</Text>}
//                 </Flex>
//                 <Box>
//                     <Text sx={activeStep === 'recipients' ? selectedMenuTitleStyle : menuTitleStyle}>Recipients</Text>
//                     <Text sx={activeStep === 'recipients' ? selectedMenuDescStyle : menuDescStyle}>Action required</Text>
//                 </Box>
//             </Flex>

//             <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('activities'))}>
//                 <Flex sx={activeStep === 'activities' ? selectedcircleContainerStyle : circleContainerStyle}>
//                     {activeStep === 'activities' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>3</Text>}
//                 </Flex>
//                 <Box>
//                     <Text sx={activeStep === 'activities' ? selectedMenuTitleStyle : menuTitleStyle}>Activities</Text>
//                     <Text sx={activeStep === 'activities' ? selectedMenuDescStyle : menuDescStyle}>Incomplete</Text>
//                 </Box>
//             </Flex>

//             <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('details'))}>
//                 <Flex sx={activeStep === 'details' ? selectedcircleContainerStyle : circleContainerStyle}>
//                     {activeStep === 'details' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>4</Text>}
//                 </Flex>
//                 <Box>
//                     <Text sx={activeStep === 'details' ? selectedMenuTitleStyle : menuTitleStyle}>Details</Text>
//                     <Text sx={activeStep === 'details' ? selectedMenuDescStyle : menuDescStyle}>Incomplete</Text>
//                 </Box>
//             </Flex>

//             <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('review'))}>
//                 <Flex sx={activeStep === 'review' ? selectedcircleContainerStyle : circleContainerStyle}>
//                     {activeStep === 'review' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>5</Text>}
//                 </Flex>
//                 <Box>
//                     <Text sx={activeStep === 'review' ? selectedMenuTitleStyle : menuTitleStyle}>Review</Text>
//                     <Text sx={activeStep === 'review' ? selectedMenuDescStyle : menuDescStyle}>Incomplete</Text>
//                 </Box>
//             </Flex>

//             <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('payment'))}>
//                 <Flex sx={activeStep === 'payment' ? selectedcircleContainerStyle : circleContainerStyle}>
//                     {activeStep === 'payment' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>6</Text>}
//                 </Flex>
//                 <Box>
//                     <Text sx={activeStep === 'payment' ? selectedMenuTitleStyle : menuTitleStyle}>Payment</Text>
//                     <Text sx={activeStep === 'payment' ? selectedMenuDescStyle : menuDescStyle}>Required</Text>
//                 </Box>
//             </Flex>

//         </Stack>
//       </Box>
//     </>
//   )
// }

// export default BuildLeftNav