import { CheckIcon } from "@chakra-ui/icons"
import { Stack, Heading, Text, Box, Icon, Flex} from "@chakra-ui/react"
import {BsCircleFill} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux"
import { setActiveStep } from "../../store/actions/PostActions"

const BuildLeftNav = () => {
    const dispatch = useDispatch()
    const activeStep = useSelector(state => state.post.activeStep)
    const completedStep = useSelector(state => state.post)
    console.log('completedStep: ', completedStep)
    const menuTitleStyle = {
        fontSize: 'md',
    }
    const menuDescStyle = {
        fontSize: 'xs',
    }
    const circleContainerStyle = {
        w: '24px',
        h: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        border: '1px solid #1A202C',
    }
    const numberStyle = {
        fontSize: 'sm',
        fontWeight: 'semibold',
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
    }
  return (
    <>
      <Box minW={"290px"} bg={"gray.200"} px={5}>
        <Heading fontSize={'3xl'} py={5} >SPA</Heading>
        <Box py={5} borderBottom={'1px solid #D0D4D9'} borderTop={'1px solid #D0D4D9'}>
            <Text fontWeight={'semibold'} fontSize={'sm'} >Current deal status</Text>
            <Flex alignItems={'center'} gap={3}>
                <Icon as={BsCircleFill} boxSize={2} color={"blue.500"} />
                <Text fontSize={'sm'}>Draft</Text>
            </Flex>
        </Box>
        
        <Stack gap={5} py={5}>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('deal_type'))}>
                <Flex sx={activeStep === 'deal_type' ? selectedcircleContainerStyle : (completedStep.postType ? completedCircleStyle : circleContainerStyle)}>
                    {activeStep === 'deal_type' ? <Icon as={CheckIcon} boxSize={3} /> : (completedStep.postType ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>1</Text>)}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'deal_type' ? selectedMenuTitleStyle : menuTitleStyle}>Deal Type</Text>
                    <Text sx={activeStep === 'deal_type' ? selectedMenuDescStyle : menuDescStyle}>{completedStep.postType ? 'Completed' : 'Incomplete'}</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('recipients'))}>
                <Flex sx={activeStep === 'recipients' ? selectedcircleContainerStyle : circleContainerStyle}>
                    {activeStep === 'recipients' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>2</Text>}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'recipients' ? selectedMenuTitleStyle : menuTitleStyle}>Recipients</Text>
                    <Text sx={activeStep === 'recipients' ? selectedMenuDescStyle : menuDescStyle}>Action required</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('activities'))}>
                <Flex sx={activeStep === 'activities' ? selectedcircleContainerStyle : circleContainerStyle}>
                    {activeStep === 'activities' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>3</Text>}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'activities' ? selectedMenuTitleStyle : menuTitleStyle}>Activities</Text>
                    <Text sx={activeStep === 'activities' ? selectedMenuDescStyle : menuDescStyle}>Incomplete</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('details'))}>
                <Flex sx={activeStep === 'details' ? selectedcircleContainerStyle : circleContainerStyle}>
                    {activeStep === 'details' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>4</Text>}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'details' ? selectedMenuTitleStyle : menuTitleStyle}>Details</Text>
                    <Text sx={activeStep === 'details' ? selectedMenuDescStyle : menuDescStyle}>Incomplete</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('review'))}>
                <Flex sx={activeStep === 'review' ? selectedcircleContainerStyle : circleContainerStyle}>
                    {activeStep === 'review' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>5</Text>}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'review' ? selectedMenuTitleStyle : menuTitleStyle}>Review</Text>
                    <Text sx={activeStep === 'review' ? selectedMenuDescStyle : menuDescStyle}>Incomplete</Text>
                </Box>
            </Flex>

            <Flex sx={menuContainer} gap={5} onClick={()=> dispatch(setActiveStep('payment'))}>
                <Flex sx={activeStep === 'payment' ? selectedcircleContainerStyle : circleContainerStyle}>
                    {activeStep === 'payment' ? <Icon as={CheckIcon} boxSize={3} /> : <Text sx={numberStyle}>6</Text>}
                </Flex>
                <Box>
                    <Text sx={activeStep === 'payment' ? selectedMenuTitleStyle : menuTitleStyle}>Payment</Text>
                    <Text sx={activeStep === 'payment' ? selectedMenuDescStyle : menuDescStyle}>Required</Text>
                </Box>
            </Flex>

        </Stack>
      </Box>
    </>
  )
}

export default BuildLeftNav
