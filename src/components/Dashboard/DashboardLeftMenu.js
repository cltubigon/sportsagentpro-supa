import React from 'react'
import { Box, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { BiCamera, BiGlobe, BiMenu } from 'react-icons/bi'
import {CgMenuGridO} from 'react-icons/cg'
import {TbFileDollar} from 'react-icons/tb'
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'



const DashboardLeftMenu = () => {
    const stickyLeftMenu = {
        w: '100%',
        mb: '560px',
        top: '88px',
        p: 4,
        position: 'sticky',
    }
    const leftNavStyle = {
        alignItems: 'center',
        gap: 2,
    }
    return (
        <>
            <Box>
                <Stack sx={stickyLeftMenu} gap={4}>
                    <Link to='/network'>
                        <Flex sx={leftNavStyle}>
                            <Icon as={BiGlobe} />
                            <Text>Discover</Text>
                        </Flex>
                    </Link>
                    <Flex sx={leftNavStyle}>
                        <Icon as={BiCamera} />
                        <Text>Media</Text>
                    </Flex>
                    <Divider border={'1px solid #CBD5E0'} />
                    <Flex sx={leftNavStyle}>
                        <Icon as={CgMenuGridO} />
                        <Text>Opportunities</Text>
                    </Flex>
                    <Flex sx={leftNavStyle}>
                        <Icon as={TbFileDollar} />
                        <Text>Deals</Text>
                    </Flex>
                </Stack>
            </Box>
        </>
    )
}

export default DashboardLeftMenu