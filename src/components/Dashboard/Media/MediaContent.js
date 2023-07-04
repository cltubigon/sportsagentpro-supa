import React from 'react'
import { Box, Container, Flex, Stack, Text } from '@chakra-ui/react'
import Athletes from '../../Home/Athletes'
import Brands from '../Discover/Brands'
import { useSelector } from 'react-redux'

const MediaContent = () => {
    const auth = useSelector(state => state.auth)
    const { profile } = auth
    const userType = profile && profile.userType
    // console.log('profile.userType: ', profile.userType)
    return (
        <>
        <Flex>
            <Text>Hi</Text>
        </Flex>
            {/* {userType && userType === 'brand' && <Athletes />}
            {userType && userType === 'athlete' && <Brands />} */}
        </>
    )
}

export default MediaContent