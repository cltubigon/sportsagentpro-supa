import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { setActiveStep } from '../../store/actions/PostActions'

const Review = () => {
  const dispatch = useDispatch()

  const contentContainer = {
    my: 4,
    flexGrow: 1,
    flexDirection: 'column',
    gap: 4,
    width: '100%',
    overflowY: 'auto',
    bg: '#ccc',
    height: '100%'
  }
  return (
    <>
      <Flex flexDirection={'column'} py={5} px={20} position={'relative'} flexGrow={1} justifyContent={'space-between'} >
        <Flex flexGrow={1} flexDirection={'column'} height={'65vh'} overscrollY={'auto'}>
          <Flex><Text>Recipients</Text></Flex>
          <Flex sx={contentContainer}>

              <Heading color={'gray.300'}>Review content here...</Heading>

          </Flex>
          </Flex>
            <Flex justifyContent={'space-between'}>
              <Button leftIcon={<BsChevronLeft />} onClick={()=> dispatch(setActiveStep('details'))}>Previous Step</Button>
              <Button rightIcon={<BsChevronRight />} colorScheme='twitter'  onClick={()=> dispatch(setActiveStep('payment'))}>Next Step</Button>
            </Flex>
        </Flex>
    </>
  )
}

export default Review