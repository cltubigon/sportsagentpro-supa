import React from 'react'
import NavigationBar from '../components/layouts/NavigationBar'
import { Container } from '@chakra-ui/react'
import ProfileSubNavigation from '../components/Profile/ProfileSubNavigation'
import ProfileGallery from '../components/Profile/ProfileGallery'

const Profile = () => {
    const containerStyle = {
        maxW: "1440px",
        h: "100vh",
        bg: "gray.100",
        px: 0,
        }
        return (
        <Container sx={containerStyle}>
            <NavigationBar/>
            <ProfileSubNavigation/>
            <ProfileGallery/>
        </Container>
        )
    }

export default Profile
