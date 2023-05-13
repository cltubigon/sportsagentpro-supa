import { Avatar, AvatarBadge, Box, Button, Center, Checkbox, Flex, FormControl, Icon, InputGroup, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { setActiveStep, setCheckboxTrueOrFalse, setInitialFilteredAthletes } from '../../store/actions/PostActions'
import { firestoreConnect } from 'react-redux-firebase'
import { RecipientListSkeleton } from '../Skeleton/Skeletons'
import { saveAthletesToStorage } from '../../store/actions/athleteActions'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { GrFormClose } from 'react-icons/gr'

const Recipients = () => {
  const dispatch = useDispatch()
  const reduxState = useSelector(state => state)
  const localAthletes = useSelector(state => state.athlete.athletes)
  const localRecipients = useSelector(state => state.post.recipients)
  const firestoreAthletes = useSelector(state=> state.firestore.ordered.athlete)
  const searchQuery = useSelector(state => state.post.searchRecipient)
  console.log('searchQuery: ', searchQuery)

  const filteredRecipients = searchQuery !== '' ? (localRecipients && localRecipients.filter((athlete) => {
    return(
      athlete.firstName.toLowerCase().includes(searchQuery) || athlete.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })) : localRecipients

  useEffect(()=> {
    if (!localRecipients && localAthletes) dispatch(setInitialFilteredAthletes(localAthletes))
  }, [localAthletes])

  useEffect(()=> {
    if (firestoreAthletes) {
      dispatch(saveAthletesToStorage(firestoreAthletes))
    }
  },[firestoreAthletes])

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

  console.log('localRecipients 2: ', localRecipients)
  console.log('filteredRecipients: ', filteredRecipients)
  return (
    <>
      <Flex flexDirection={'column'} py={5} px={20} position={'relative'} flexGrow={1} justifyContent={'space-between'} >
        <Flex flexGrow={1} flexDirection={'column'}>
          <Flex>
            <Text>Recipients list</Text>
          </Flex>

          <Flex flexGrow={1} height={'65vh'} flexDirection={'row'}>
            
            <Flex sx={contentContainer} flexBasis={'60%'}>       
              <Flex flexGrow={1}>


                  <Flex flexBasis={'100%'} flexDirection={'column'} flexGrow={1} >
                    <FormControl>
                      <InputGroup display={"flex"} flexDirection={"column"}>

                        {filteredRecipients && filteredRecipients.length > 1 ? (filteredRecipients ? filteredRecipients.map((athlete)=> {
                              return (
                                <Flex key={athlete.id} sx={recipientContainer} cursor={'pointer'} onClick={()=> dispatch(setCheckboxTrueOrFalse(athlete.id))} >
                                  {athlete.isChecked ? <Icon as={MdCheckBox} boxSize={5} /> : <Icon as={MdCheckBoxOutlineBlank} boxSize={5} />}
                                  <Avatar name={athlete.initials}>
                                    <AvatarBadge boxSize='0.9em' bg='green.500' />
                                  </Avatar>
                                  <Box pl={2}>
                                    <Text>{athlete.firstName[0]}. {athlete.lastName}</Text>
                                    <Text>Student-Athlete • Tennis • Fresno State Bulldogs</Text>
                                  </Box>
                                </Flex>
                              )
                            })
                            :
                            <RecipientListSkeleton />)
                          : 
                          <Center height={'100%'} width={'100%'}>
                            <Text fontSize={'xl'}>No data found</Text>
                          </Center>
                        }

                      </InputGroup>
                    </FormControl>
                  </Flex>

              </Flex>
            </Flex>



            <Flex sx={contentContainer} flexBasis={'40%'}>       
              <Flex flexGrow={1}>

                <Flex flexGrow={1}>
                  <Flex bg={'gray.100'} border={'1px solid #89949F'} borderRadius={'6px'} position={'sticky'} top={'0'} flexBasis={'100%'} alignItems={'center'} justifyItems={'flex-start'} flexDirection={'column'}>
                    {
                      localRecipients && localRecipients.some(recipient => recipient.isChecked) ? localRecipients.filter(recipient => recipient.isChecked).map((recipient)=> {
                        return (
                            <Flex key={recipient.id} alignItems={'flex-start'}>
                              <Flex sx={recipientContainer}>
                                <Icon as={GrFormClose} boxSize={5} cursor={'pointer'} onClick={()=> dispatch(setCheckboxTrueOrFalse(recipient.id))} />
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
                </Flex>

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