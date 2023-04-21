import React from 'react'
import ProfileSubNavigation from './ProfileSubNavigation'
import ProfileGallery from './ProfileGallery'
import ProfileContent from './ProfileContent'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Profile = ({athlete}) => {
        return (
        <>
            <ProfileSubNavigation />
            <ProfileGallery />
            <ProfileContent athlete={athlete}/>
        </>
        )
    }

const mapStateToProps = (state, props) => {
    const { id } = props
    const athletes = state.firestore.data.athlete
    const athlete = athletes ? athletes[id] : null
    return {
        athlete: athlete
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'athlete'
    }])
)(Profile)