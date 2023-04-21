import React from 'react'
import NavigationBar from '../components/layouts/NavigationBar'
import { Container } from '@chakra-ui/react'
import ProfileSubNavigation from '../components/Profile/ProfileSubNavigation'
import ProfileGallery from '../components/Profile/ProfileGallery'
import ProfileContent from '../components/Profile/ProfileContent'
import Footer from '../components/layouts/Footer'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import MainProfile from '../components/Profile/MainProfile'

const Profile = () => {
    const { id } = useParams()
    const containerStyle = {
        maxW: "1440px",
        h: "100vh",
        px: 0,
        }
        return (
        <Container sx={containerStyle}>
            <MainProfile id={id} />
        </Container>
        )
    }

export default (Profile)
