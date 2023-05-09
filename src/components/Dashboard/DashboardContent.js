import React from 'react'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import Athletes from '../Home/Athletes'

const DashboardContent = () => {
    const overFlowContainer = {
        height: 'calc(100vh - 230px)',
        overflowY: 'auto',
        pt: 3,
    }
    return (
        <>
            <Box sx={overFlowContainer}>
                <Athletes />
            </Box>
        </>
    )
}

export default DashboardContent