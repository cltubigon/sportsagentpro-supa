import { Text, Flex } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

const Athletes = () => {
  const reduxState = useSelector(state => state)
  console.log('reduxState: ', reduxState)

  return (
    <>
    <Flex><Text>Hello world</Text></Flex>
    </>
  )
}

export default firestoreConnect([{ collection: 'athlete' }])(Athletes);