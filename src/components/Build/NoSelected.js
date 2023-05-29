import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setActiveStep } from '../../store/actions/buildPostActions'

const NoSelected = ({ category }) => {
    const dispatch = useDispatch()
  return (
    <>
        <Flex flexDirection={'column'} justifyContent={'center'} alignContent={'center'} gap={4} >
            <Text fontSize={'lg'} fontWeight={'semibold'} textAlign={'center'} >No {category.toLowerCase()} have been {category.toLowerCase() === 'details' ? 'added' : 'selected'}</Text>
            <Button onClick={()=> {
              dispatch(setActiveStep(category.toLowerCase()))
            }} colorScheme="twitter" width={'fit-content'} margin={'0 auto'} >{category.toLowerCase() === 'details' ? 'Add' : 'Select'} {category}</Button>
        </Flex>
    </>
  )
}

export default NoSelected