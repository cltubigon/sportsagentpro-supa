import { SearchIcon } from "@chakra-ui/icons"
import { Avatar, Grid, GridItem, AvatarBadge, Box, Button, Center, Flex, FormControl, Icon, InputGroup, Text, InputLeftElement, Input, Spinner, filter } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { TfiClose, TfiMenuAlt } from 'react-icons/tfi'
import { RxDashboard } from 'react-icons/rx'
import React, { useEffect, useState } from 'react'
import { setActiveStep, setCheckboxTrueOrFalse, setInitialFilteredAthletes } from '../../store/actions/PostActions'
import { saveAthletesToStorage } from '../../store/actions/athleteActions'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { firestoreConnect } from "react-redux-firebase"
import { useForm } from "react-hook-form"

const RecipientsV1 = () => {
    const dispatch = useDispatch()
    const reduxState = useSelector(state => state)
    const localAthletes = useSelector(state => state.athlete.athletes)
    const localRecipients = useSelector(state => state.post.recipients)
    const firestoreAthletes = useSelector(state=> state.firestore.ordered.athlete)
    const count = useSelector(state => state.post.selectedRecipientsCount)
    
    const [tab, setTab] = useState(true)

    const { register, watch } = useForm()

    const watched = watch('searchQuery')
    const filteredRecipients = watched && watched !== '' ? (localRecipients && localRecipients.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName} ${athlete.firstName} `
        return(
            fullName.toLowerCase().includes(watched) || fullName.toLowerCase().includes(watched.toLowerCase())
        )
    })) : localRecipients

    useEffect(()=> {
        if (!localRecipients && localAthletes || localRecipients && localAthletes && localRecipients.length !== localAthletes.length) {
            console.log('triggered localAthletes: ', localAthletes)
            dispatch(setInitialFilteredAthletes(localAthletes))
        }
    }, [localAthletes])
    
    useEffect(()=> {
        if ((firestoreAthletes && localAthletes && firestoreAthletes.length !== localAthletes.length) || firestoreAthletes && localAthletes === null) {
            console.log('triggered firestoreAthletes: ', firestoreAthletes)
        dispatch(saveAthletesToStorage(firestoreAthletes))
        }
    },[firestoreAthletes])
  
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
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Recipients</Text>
                    <Text color={"gray.500"} fontSize={'sm'}>Select which sender you will be sending this for</Text>
                </Flex>
                <Flex>
                    <Icon as={TfiClose} boxSize={4} />
                </Flex>
            </Flex>

        <Flex px={20}>
            <Flex flexGrow={1} gap={8} pt={4} mb={tab ? 10 : 2} borderBottom={"2px solid #EBEFF2"}>
                <Text onClick={()=> setTab(()=> true)} borderBottom={tab ? '2px solid #000' : 'none'} pb={2} cursor={'pointer'}>Discover</Text>
                <Text onClick={()=> setTab(()=> false)} color={count < 1 && 'gray.400'} borderBottom={tab ? 'none' : '2px solid #000'} pb={2} cursor={'pointer'}>Selected Receipients {count > 0 && `(${count})`}</Text>
            </Flex>
        </Flex>

            {tab && <Flex px={20}>
                <InputGroup >
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input id="searchQuery" {...register('searchQuery')} placeholder="Search activities..." border={'1px solid #89949F'} borderRadius={'50px'} />
                </InputGroup>
            </Flex>}
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        {/* -------------------------------------- First Tab -------------------------------------- */}
        <GridItem pl={'80px'} pr={'65px'} area={'main'} overflowY={'auto'} position={'relative'}>
            <Flex bgColor={'#fff'} zIndex={'10'} pb={4} gap={4} justifyContent={'flex-end'} position={'sticky'} top={'0'}>
                <Icon as={RxDashboard} boxSize={6} />
                <Icon as={TfiMenuAlt} boxSize={6} color={'blue.400'} />
            </Flex>

            {tab && <Flex flexBasis={'100%'} flexDirection={'column'} flexGrow={1} >
                <FormControl>
                <InputGroup display={"flex"} flexDirection={"column"}>
                    {filteredRecipients ? filteredRecipients.map((athlete)=> {
                            return (
                                <Flex key={athlete.id} sx={recipientContainer} cursor={'pointer'} onClick={()=> dispatch(setCheckboxTrueOrFalse(athlete.id))} >
                                {athlete.isChecked ? <Icon as={MdCheckBox} boxSize={5} /> : <Icon as={MdCheckBoxOutlineBlank} boxSize={5} />}
                                <Avatar name={athlete.initials}>
                                    <AvatarBadge boxSize='0.9em' bg='green.500' />
                                </Avatar>
                                <Box pl={2}>
                                    <Text fontWeight={'semibold'}>{athlete.firstName} {athlete.lastName}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'} >Student-Athlete • Tennis • Fresno State Bulldogs</Text>
                                </Box>
                                </Flex>
                            )
                        }) : <Flex height={'250px'} alignItems={'center'} justifyContent={'center'} flexGrow={1}><Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' /></Flex>
                    }
                    {filteredRecipients && filteredRecipients.length == 0 && <Flex><Text>No data found</Text></Flex>}
                </InputGroup>
                </FormControl>
            </Flex>}

            {/* -------------------------------------- Second Tab -------------------------------------- */}
            {!tab && <Flex flexBasis={'100%'} flexDirection={'column'} flexGrow={1} >
                {count > 0 ? <FormControl>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                        {filteredRecipients ? filteredRecipients.filter(athlete => athlete.isChecked === true).map((athlete)=> {
                                return (
                                    <Flex key={athlete.id} sx={recipientContainer} cursor={'pointer'} onClick={()=> dispatch(setCheckboxTrueOrFalse(athlete.id))} >
                                    {athlete.isChecked ? <Icon as={MdCheckBox} boxSize={5} /> : <Icon as={MdCheckBoxOutlineBlank} boxSize={5} />}
                                    <Avatar name={athlete.initials}>
                                        <AvatarBadge boxSize='0.9em' bg='green.500' />
                                    </Avatar>
                                    <Box pl={2}>
                                        <Text fontWeight={'semibold'}>{athlete.firstName} {athlete.lastName}</Text>
                                        <Text fontSize={'sm'} color={'gray.500'} >Student-Athlete • Tennis • Fresno State Bulldogs</Text>
                                    </Box>
                                    </Flex>
                                )
                            }) : <Flex height={'250px'} alignItems={'center'} justifyContent={'center'} flexGrow={1}><Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' /></Flex>
                        }
                        {filteredRecipients && filteredRecipients.length == 0 && <Flex><Text>No data found</Text></Flex>}
                    </InputGroup>
                </FormControl>
                :
                <Flex flexDirection={'column'} height={'40vh'} justifyContent={'center'} alignContent={'center'} gap={4} >
                    <Text fontSize={'lg'} fontWeight={'semibold'} textAlign={'center'} >No recipients have been selected</Text>
                    <Button onClick={()=> setTab(()=> true)} colorScheme="twitter" width={'fit-content'} margin={'0 auto'} >Select Recipients</Button>
                </Flex>}
            </Flex>}
        </GridItem>

                {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={'footer'}>
            <Flex justifyContent={'space-between'} bottom={'0'}>
                <Button leftIcon={<BsChevronLeft />} onClick={()=> dispatch(setActiveStep('deal_type'))}>Previous Step</Button>
                <Button rightIcon={<BsChevronRight />} colorScheme='twitter'  onClick={()=> dispatch(setActiveStep('activities'))}>Next Step</Button>
            </Flex>
        </GridItem>
        </Grid>
    </>
  )
}

export default firestoreConnect([{
    collection: 'athlete'
  }])(RecipientsV1)