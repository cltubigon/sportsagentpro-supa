import React from 'react'
import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import MainProfile from '../components/Profile/MainProfile'

const Profile = () => {
    console.log("Profile rendered")
    const { id } = useParams()
    const containerStyle = {
        maxW: "1440px",
        px: 0,
        }
        return (
        <Container sx={containerStyle}>
            <MainProfile id={id} />
        </Container>
        )
    }

export default (Profile)