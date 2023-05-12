import { Avatar, AvatarBadge, Box, Button, Center, Checkbox, Flex, FormControl, Icon, InputGroup, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { setActiveStep, setCheckAsTrue, setCheckFalse, setInitialFilteredAthletes } from '../../store/actions/PostActions'
import { firestoreConnect } from 'react-redux-firebase'
import { RecipientListSkeleton } from '../Skeleton/Skeletons'
import {GrFormClose} from 'react-icons/gr'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { saveAthletesToStorage } from '../../store/actions/athleteActions'

const Recipients = () => {
  const dispatch = useDispatch()
  const getState = useSelector(state => state)
  const localAthletes = useSelector(state => state.athlete.athletes)
  const filteredAthletes = useSelector(state => state.post.filteredAthletes)
  const firestoreAthletes = useSelector(state=> state.firestore.ordered.athlete)
  const { register, handleSubmit, formState, watch } = useForm()
  // const { register, handleSubmit, formState, watch } = useForm({
  //   defaultValues: {
  //     recipients: [] // Initialize recipients field as an empty array
  //   }
  // })
  
  console.log('getState: ', getState)
  console.log('localAthletes: ', localAthletes)
  const watchedRecipients = watch("recipients")

  useEffect(()=> {
    if (!filteredAthletes && !watchedRecipients) dispatch(setInitialFilteredAthletes(localAthletes))
  }, [localAthletes])

  useEffect(()=> {
    console.log('I am still triggereddd')
    console.log('watchedRecipients top: ', watchedRecipients)
    if (watchedRecipients && watchedRecipients.length >= 1) {
      console.log('one or more than one', watchedRecipients)
      const parsedRecipients = watchedRecipients.map((recipient) => {
        return (
          JSON.parse(recipient)
          )
        })
        dispatch(setCheckAsTrue(parsedRecipients))
      console.log('parsedRecipients: ', parsedRecipients)
    } else if (watchedRecipients && watchedRecipients.length <= 1) {
      console.log('I am less than one or empty')
      console.log('watchedRecipients: ', watchedRecipients)
      dispatch(setCheckFalse())
    }
    console.log('watchedRecipients bottom: ', watchedRecipients)
    
    return console.log('I ended')
  }, [watchedRecipients])

  useEffect(()=> {
    if (firestoreAthletes) {
      dispatch(saveAthletesToStorage(firestoreAthletes))
    }
  },[firestoreAthletes])

  // const onSubmit = (data) => {
  //   console.log("data: ", data)
  // }

  const contentContainer = {
    my: 4,
    flexDirection: 'column',
    gap: 4,
    overflowY: 'auto',
  }
  const recipientContainer = {
    alignItems: 'center',
    gap: 3,
    px: 4,
    py: 2,
    borderRadius: '5px',
    border: '1px solid transparent',
    _hover: {border: '1px solid #EBEFF2' },
  }
  return (
    <>
      <Flex flexDirection={'column'} py={5} px={20} position={'relative'} flexGrow={1} justifyContent={'space-between'} >
        <Flex flexGrow={1} flexDirection={'column'}>
          <Flex><Text>Recipients list</Text></Flex>

          <Flex flexGrow={1} height={'65vh'} flexDirection={'row'}>
            
            <Flex sx={contentContainer} flexBasis={'60%'}>       
              <Flex flexGrow={1}>

                {/* <form onSubmit={handleSubmit(onSubmit)} noValidate> */}
                  <Flex flexBasis={'100%'} flexDirection={'column'} flexGrow={1} >
                    <FormControl>
                      <InputGroup display={"flex"} flexDirection={"column"}>

                        {filteredAthletes && filteredAthletes.length > 0 ? filteredAthletes.map((athlete)=> {
                          return (
                            <Checkbox isChecked={athlete.isChecked} key={athlete.id} value={JSON.stringify(athlete)} {...register("recipients")}>
                              <Flex sx={recipientContainer}>
                                <Avatar name={athlete.initials}>
                                  <AvatarBadge boxSize='0.9em' bg='green.500' />
                                </Avatar>
                                <Box pl={2}>
                                  <Text>{athlete.firstName[0]}. {athlete.lastName}</Text>
                                  <Text>Student-Athlete • Tennis • Fresno State Bulldogs</Text>
                                </Box>
                              </Flex>
                            </Checkbox>
                          )
                        })
                        :
                        <RecipientListSkeleton />
                        }

                      </InputGroup>
                    </FormControl>
                  </Flex>
                {/* </form> */}

              </Flex>
            </Flex>



            <Flex sx={contentContainer} flexBasis={'40%'}>       
              <Flex flexGrow={1}>

                {/* <Flex flexGrow={1}>
                  <Flex position={'sticky'} top={'0'} flexBasis={'100%'} alignItems={'center'} justifyItems={'flex-start'} flexDirection={'column'}>
                    {
                      selectedRecipients && selectedRecipients.length > 0 ? selectedRecipients.map((recipient)=> {
                        return (
                            <Flex key={recipient.id} alignItems={'flex-start'}>
                              <Flex sx={recipientContainer}>
                                <Icon as={GrFormClose} boxSize={5} cursor={'pointer'} />
                                <Avatar name={recipient.initials}>  
                                  <AvatarBadge boxSize='0.9em' bg='green.500' />
                                </Avatar>
                                <Box pl={2}>
                                  <Text>{recipient.firstName[0]}. {recipient.lastName}</Text>
                                  <Text>Student-Athlete • Tennis • Fresno State Bulldogs</Text>
                                </Box>
                              </Flex>
                            </Flex>
                        )
                      })
                      :
                      <Center height={'100%'} width={'100%'}>
                        <Text fontSize={'xl'}>No recipient selected</Text>
                      </Center>
                    }
                  </Flex>
                </Flex> */}

              </Flex>
            </Flex>
          </Flex>

          </Flex>
            <Flex justifyContent={'space-between'} bottom={'0'}>
              <Button leftIcon={<BsChevronLeft />} onClick={()=> dispatch(setActiveStep('deal_type'))}>Previous Step</Button>
              <Button rightIcon={<BsChevronRight />} colorScheme='twitter'  onClick={()=> dispatch(setActiveStep('activities'))}>Next Step</Button>
           </Flex>
        </Flex>
    </>
  )
}

export default firestoreConnect([{
  collection: 'athlete'
}])(Recipients)