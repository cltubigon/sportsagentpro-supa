import { Box, Button, Flex, Icon, Stack, Text, useEditable } from '@chakra-ui/react'
import React from 'react'
import {TfiPencilAlt} from 'react-icons/tfi'
import {CgMenuGridO} from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const Receipients = () => {
  const dispatch = useDispatch()
  const listOfRecipients = useSelector(state => state.athlete.athletes)
  console.log('listOfRecipients: ', listOfRecipients)
  
  const contentContainer = {
    minHeight: '47vh',
    my: 4,
    border: '1px solid #ccc',
  }
  return (
    <>
      <Flex flexDirection={'column'} py={10} px={20} position={'relative'} flexGrow={1} justifyContent={'space-between'} >
        <Flex flexGrow={1} flexDirection={'column'}>
          <Flex><Text>Recipients</Text></Flex>
          <Flex sx={contentContainer} flexGrow={1}>
          </Flex>
        </Flex>
        <Flex justifyContent={'space-between'}>
          <Button leftIcon={<BsChevronLeft />}>Previous Step</Button>
          <Button rightIcon={<BsChevronRight />} colorScheme='twitter' >Next Step</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Receipients