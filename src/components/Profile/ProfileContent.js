import { Stack } from '@chakra-ui/react'
import React from 'react'
import ProfileContentRight from './ProfileContentRight'
import ProfileContentLeft from './ProfileContentLeft'

const ProfileContent = ({athlete}) => {
    const profileContentContainer = {
        px: "var(--chakra-space-4)",
        py: "var(--chakra-space-6)",
        flexDirection: 
            {
                base: "column",
                md: "row",
            },
        justifyContent: "space-between",
        gap: {
            base: 5,
            lg: 20,
        }
    }
  return (
    <Stack sx={profileContentContainer}>
        <ProfileContentLeft  athlete={athlete} />
        <ProfileContentRight  athlete={athlete} />
    </Stack>
  )
}

export default ProfileContent
