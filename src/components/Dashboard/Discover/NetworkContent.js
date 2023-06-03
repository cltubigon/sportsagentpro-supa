import React from 'react'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import Athletes from '../../Home/Athletes'
import Brands from './Brands'
import { useSelector } from 'react-redux'

const NetworkContent = () => {
    const auth = useSelector(state => state.auth)
    const { profile } = auth
    const userType = profile && profile.userType
    return (
        <>
            {userType && userType === 'brand' && <Athletes />}
            {userType && userType === 'athlete' && <Brands />}
        </>
    )
}

export default NetworkContent