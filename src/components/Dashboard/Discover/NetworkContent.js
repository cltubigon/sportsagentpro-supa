import React from 'react'
import Brands from './Brands'
import { useSelector } from 'react-redux'
import DiscoverAthletes from './DiscoverAthletes'

const NetworkContent = () => {
    const user = useSelector(state => state.auth.user)
    const userType = user && user.userType
    return (
        <>
            {/* {userType && userType === 'athlete' && <DiscoverAthletes />} */}
            {/* {userType && userType === 'brand' && <Brands />} */}
        </>
    )
}

export default NetworkContent