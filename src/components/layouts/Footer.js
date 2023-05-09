import { Container, Flex, Heading, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiFacebookCircleFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    console.log("Footer rendered")
  return (
    <>
        <Stack px={"var(--chakra-space-6)"} pb={12} pt={{base: 10, md: 20}}>
            <Flex justifyContent={"space-between"} gap={{base: 8}} flexDirection={{base: "column", md: "row"}}>
                <Flex gap={{base: 10, lg: 16}}>
                    <Stack color={"gray.500"} fontWeight={"semibold"} gap={3} flexGrow={1}>
                        <Text fontSize={"xl"} fontWeight={"semibold"} color={"#1A202C"} >Solutions for</Text>
                        <Text>Athletes</Text>
                        <Text>Brands</Text>
                        <Text>Sponsors</Text>
                        <Text>Collectives</Text>
                        <Text>Schools</Text>
                    </Stack>

                    <Stack color={"gray.500"} fontWeight={"semibold"} gap={3} flexGrow={1}>
                        <Text fontSize={"xl"} fontWeight={"semibold"} color={"#1A202C"} >Company</Text>
                        <Text>About us</Text>
                        <Text>Careers</Text>
                        <Text>Blog</Text>
                    </Stack>

                    <Stack color={"gray.500"} fontWeight={"semibold"} gap={3} flexGrow={1}>
                        <Text fontSize={"xl"} fontWeight={"semibold"} color={"#1A202C"} >Support</Text>
                        <Text>Help</Text>
                        <Text>Contact us</Text>
                    </Stack>
                </Flex>
                <Stack gap={3} maxWidth={{base: "300px", lg: "420px", xl: "490px"}}>
                    <Heading>Sports Agent Pro</Heading>
                    <Text>Opendorse is the leading NIL marketplace and technology company.</Text>
                    <Flex gap={2}>
                        <Icon as={AiFillTwitterCircle} boxSize={"34px"} color={"blue.800"} />
                        <Icon as={RiFacebookCircleFill} boxSize={"34px"} color={"blue.800"} />
                        <Icon as={AiFillInstagram} boxSize={"34px"} color={"blue.800"} />
                        <Icon as={RiLinkedinBoxFill} boxSize={"34px"} color={"blue.800"} />
                    </Flex>
                </Stack>
            </Flex>

            <Flex justifyContent={"space-between"} pt={10} gap={4} flexDirection={{base: "column", md: "row"}} >
                <Flex>
                    <Text>&copy; {currentYear} Sports Agent Pro</Text>
                </Flex>
                <Flex gap={7}>
                    <Text>Terms of use</Text>
                    <Text>Privacy policy</Text>
                    <Text>Subscription terms</Text>
                </Flex>
            </Flex>
        </Stack>
    </>
  )
}

export default Footer
