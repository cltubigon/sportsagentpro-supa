import React from 'react'
import ProfileSubNavigation from './ProfileSubNavigation'
import ProfileGallery from './ProfileGallery'
import ProfileContent from './ProfileContent'
import { connect, useDispatch, useSelector } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { saveAthletesToStorage, saveSelectedAthleteToStorage } from '../../store/actions/athleteActions'

const Profile = ({id}) => {
    const params = useParams()
    const dispatch = useDispatch()

    const athletes = useSelector(state => state.firestore.ordered.athlete)
    const localAthletes = useSelector(state => state.athlete.athletes)
    const localSelectedAthlete = useSelector(state => state.athlete.selectedAthlete)
    
    useEffect(()=> {
        if (athletes) {
            dispatch(saveAthletesToStorage(athletes))
        }
    }, [athletes])
    
    useEffect(()=> {
        if (localAthletes) {
            const selectedProfile = (localAthletes.filter(athlete => athlete.id == params.id  ))
            dispatch(saveSelectedAthleteToStorage(selectedProfile))
        }
    },[localAthletes])
    return (
        <>
            <ProfileSubNavigation />
            <ProfileGallery />
            <ProfileContent />
        </>
    )
}

export default firestoreConnect([{
        collection: 'athlete'
    }])(Profile)
