import { Stack } from '@chakra-ui/layout'
import React from 'react'
import Teams from '../Content/Teams'
import Athletes from '../Content/Athletes'

const Content = () => {
    return (
    <Stack px={"var(--chakra-space-4)"} py={"50px"}>
      <Athletes />
      {/* <Teams /> */}
    </Stack>
  )
}

export default Content