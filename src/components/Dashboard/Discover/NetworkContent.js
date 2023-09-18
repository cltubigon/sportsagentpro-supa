import React from 'react'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import Brands from './Brands'
import { useSelector } from 'react-redux'
import DiscoverAthletes from './DiscoverAthletes'

const NetworkContent = () => {
    const auth = useSelector(state => state.auth)
    const { profile } = auth
    const userType = profile && profile.userType
    return (
        <>
            {/* {userType && userType === 'brand' && <DiscoverAthletes />} */}
            {/* {userType && userType === 'athlete' && <Brands />} */}
        </>
    )
}

export default NetworkContent