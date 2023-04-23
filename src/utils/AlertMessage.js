import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react'

export const AlertError = (message) => {
  return (
    <Alert status='error' variant='left-accent'>
    <AlertIcon />
    <Box>
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Box>
    {/* <CloseButton
      alignSelf='flex-start'
      position='relative'
      right={-1}
      top={-1}
      onClick={onClose}
    /> */}
    </Alert>
  )
}