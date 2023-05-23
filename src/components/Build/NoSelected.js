import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setActiveStep } from '../../store/actions/PostActions'

const NoSelected = ({ category, changeActiveStep }) => {
    const dispatch = useDispatch()
  return (
    <>
        <Flex flexDirection={'column'} justifyContent={'center'} alignContent={'center'} gap={4} >
            <Text fontSize={'lg'} fontWeight={'semibold'} textAlign={'center'} >No {category.toLowerCase()} have been selected</Text>
            <Button onClick={()=> {
              dispatch(setActiveStep(category.toLowerCase()))
            }} colorScheme="twitter" width={'fit-content'} margin={'0 auto'} >Select {category}</Button>
        </Flex>
    </>
  )
}

export default NoSelected