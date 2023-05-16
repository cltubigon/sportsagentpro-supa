import { SearchIcon } from "@chakra-ui/icons"
import { Grid, GridItem, Button, Flex, Icon, InputGroup, Text, InputLeftElement, Input } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { TfiClose, TfiMenuAlt } from 'react-icons/tfi'
import { RxDashboard } from 'react-icons/rx'
import { setActiveStep } from '../../store/actions/PostActions'

const DetailsV1 = () => {
    const dispatch = useDispatch()
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
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Details</Text>
                    <Text color={"gray.500"} fontSize={'sm'}>Add information about your deal that will be shared with recipients</Text>
                </Flex>
                <Flex>
                    <Icon as={TfiClose} boxSize={4} />
                </Flex>
            </Flex>

            <Flex px={20}>
                <Flex flexGrow={1} gap={8} pt={4} mb={10} borderBottom={"2px solid #EBEFF2"}>
                    <Text borderBottom={'2px solid #000'} pb={2}>Discover</Text>
                    <Text>Selected Receipients</Text>
                </Flex>
            </Flex>

            <Flex px={20}>
                <InputGroup >
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input placeholder="Search activities..." border={'1px solid #89949F'} borderRadius={'50px'} />
                </InputGroup>
            </Flex>
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem pl={'80px'} pr={'65px'} area={'main'} overflowY={'auto'} position={'relative'}>
            <Flex bgColor={'#fff'} zIndex={'10'} pb={4} gap={4} justifyContent={'flex-end'} position={'sticky'} top={'0'}>
                <Icon as={RxDashboard} boxSize={6} />
                <Icon as={TfiMenuAlt} boxSize={6} />
            </Flex>
        </GridItem>

                {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={'footer'}>
            <Flex justifyContent={'space-between'} bottom={'0'}>
            <Button leftIcon={<BsChevronLeft />} onClick={()=> dispatch(setActiveStep('activities'))}>Previous Step</Button>
              <Button rightIcon={<BsChevronRight />} colorScheme='twitter'  onClick={()=> dispatch(setActiveStep('review'))}>Next Step</Button>
            </Flex>
        </GridItem>
        </Grid>
    </>
  )
}

export default DetailsV1