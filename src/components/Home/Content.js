import { Stack } from '@chakra-ui/layout'
import React from 'react'
import Athletes from '../Home/Athletes'

const Content = () => {
  console.log("Content")
    return (
      <>
        <Stack px={"var(--chakra-space-4)"} py={"50px"}>
          <Athletes />
          {/* <Teams /> */}
        </Stack>
      </>
  )
}

export default Content