import { Heading, Stack } from '@chakra-ui/layout'
import React from 'react'
import Teams from '../Content/Teams'

const Content = () => {
  return (
    <Stack px={"var(--chakra-space-4)"} py={"50px"}>
      <Heading>This is the content area</Heading>
      <Teams />
    </Stack>
  )
}

export default Content