import React from 'react'
import { useSelector } from 'react-redux'
import DiscoverAthleteType from './DiscoverAthleteType'
import DiscoverBrandType from './Brand/DiscoverBrandType'

const NetworkContent = () => {
    const userType = useSelector(state => state.auth.user?.userType)
    return (
        <>
            {userType && userType === 'brand' && <DiscoverBrandType />}
            {userType && userType === 'athlete' && <DiscoverAthleteType />}
        </>
    )
}

export default NetworkContent