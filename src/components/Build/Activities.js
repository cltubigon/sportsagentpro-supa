import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { setActiveStep } from '../../store/actions/PostActions'

const Activities = () => {
  const dispatch = useDispatch()

  const postType = useSelector(state => state.post.postType)
  const [prevButton, setPrevButton] = useState('deal_type')  
  useEffect(()=> {
    postType === 'opportunity' ? setPrevButton('deal_type') : setPrevButton('recipients')
  }, [postType])

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

              <Heading color={'gray.300'}>Activities content here...</Heading>

          </Flex>
          </Flex>
            <Flex justifyContent={'space-between'}>
              <Button leftIcon={<BsChevronLeft />} onClick={()=> dispatch(setActiveStep(prevButton))}>Previous Step</Button>
              <Button rightIcon={<BsChevronRight />} colorScheme='twitter' onClick={()=> dispatch(setActiveStep('details'))}>Next Step</Button>
            </Flex>
        </Flex>
    </>
  )
}

export default Activities