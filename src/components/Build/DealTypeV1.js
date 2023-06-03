import { SearchIcon } from "@chakra-ui/icons"
import { Grid, Box, GridItem, Stack, useEditable, Button, Flex, Icon, InputGroup, Text, InputLeftElement, Input } from '@chakra-ui/react'
import { BsChevronLeft } from 'react-icons/bs'
import { TfiClose, TfiMenuAlt } from 'react-icons/tfi'
import { RxDashboard } from 'react-icons/rx'
import React from "react"
import { useState } from "react"
import { FaRunning, FaUsers, FaCommentDollar, FaRegGrinHearts, FaUserTie, } from "react-icons/fa"
import { TfiPencilAlt } from "react-icons/tfi"
import { CgMenuGridO } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { resetBuildState, uildState, savePostType, setActiveStep, setBuildState, setPostOwner } from "../../store/actions/buildPostActions"
import { useEffect } from "react"
import { BsChevronRight } from "react-icons/bs"
import { firestoreConnect } from "react-redux-firebase"
import { savePostsToStorage } from "../../store/actions/postActions"

const DealTypeV1 = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const build = useSelector(state => state.build)
    const post = useSelector(state => state.post)
    const auth = useSelector(state => state.auth)
    const reduxState = useSelector(state => state)
    const firestore = useSelector(state => state.firestore)
    const firebase = useSelector((state) => state.firebase)
    console.log('firestore: ', firestore)
    console.log('reduxState: ', reduxState)
    console.log('id: ', id)

    const { profile } = auth
    const { postType, postOwner } = build
    
    const { posts } = post
    const firestorePost = firestore.ordered.posts

    useEffect(()=> {
        if (profile) {
            postOwner !== profile.email && dispatch(resetBuildState())
            postOwner !== profile.email && dispatch(setPostOwner(profile.email))
        }
        return
    }, [])

    useEffect(() => {
        if (firestorePost && posts && firestorePost.length !== posts.length) {
          const filterToOwnerPosts = firestorePost && firebase.auth.uid && firestorePost.filter(post => post.ownerUID === firebase.auth.uid)
          dispatch(savePostsToStorage(filterToOwnerPosts))
        }
      }, [firestorePost])

    useEffect(()=> {
        const selectedPost = posts && posts.filter(post => post.id === id)
        console.log('selectedPost: ', selectedPost)
        selectedPost.length > 0 && dispatch(setBuildState(selectedPost[0]))
        selectedPost.length === 0 && dispatch(resetBuildState())
    }, [])
    
    const [nextButton, setNextButton] = useState('recipients')  
    useEffect(()=> {
        postType !== 'opportunity' ? setNextButton('recipients') : setNextButton('activities')
    }, [postType])

    const typeOfUsers = [
        {
        icon: TfiPencilAlt,
        type: "Offer",
        value: "offer",
        desc: "Offers are deals that are sent directly to one or more recipients, allowing you to target exactly who you want.",
        id: 1,
        },
        {
        icon: CgMenuGridO,
        type: "Opportunity",
        value: "opportunity",
        desc: "Opportunities are posted for all users in the marketplace to review and apply to, giving you the flexibility to select from a pool of applicants.",
        id: 2,
        },
    ]

    const selected = {
        bg: "blue.100",
        boxShadow: "md",
        color: "gray.800",
    }
    const contentContainer = {
        minHeight: '47vh',
        my: 4,
    }
  return (
    <>
        <Grid
            templateAreas={`"header"
                            "main"
                            "footer"`}
            gridTemplateRows={'2fr 9fr auto'}
            gridTemplateColumns={'1fr'}
            h='100vh'
            >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={'header'} pb={4}>
            <Flex px={20} flexGrow={1} alignItems={'center'} borderBottom={"2px solid #EBEFF2"}>
                <Flex flexGrow={1} flexDirection={'column'} py={4} >
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Deal type</Text>
                    <Text color={"gray.500"} fontSize={'sm'}>Select what type of deal you will be building out</Text>
                </Flex>
                <Flex>
                    <Link to={'/network'}><Icon as={TfiClose} boxSize={4} /></Link>
                </Flex>
            </Flex>
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem pl={'80px'} pr={'65px'} area={'main'} overflowY={'auto'} position={'relative'}>
            <Flex gap={6} flexDirection={'column'}>
                {typeOfUsers.map((type) => {
                    return (
                    <Flex sx={postType === type.value && selected} cursor={"pointer"} border={"1px solid #B8BFC5"} pr={6} py={5} key={type.id} borderRadius={4} onClick={() => dispatch(savePostType(type.value))}>
                        <Flex alignItems={"center"} justifyContent={"center"} w={"64px"}>
                        <Icon color={"gray.500"} boxSize={6} as={type.icon} />
                        </Flex>
                        <Box>
                        <Text fontWeight={"semibold"}>{type.type}</Text>
                        <Text fontSize={"sm"}>{type.desc}</Text>
                        </Box>
                    </Flex>
                    )
                })}
            </Flex>
        </GridItem>

                {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={'footer'}>
            <Flex justifyContent={'flex-end'} bottom={'0'}>
                <Button rightIcon={<BsChevronRight />} colorScheme="twitter" onClick={()=> dispatch(setActiveStep(nextButton))} >Next Step</Button>
            </Flex>
        </GridItem>
        </Grid>
    </>
  )
}

export default firestoreConnect([{ collection: 'posts' }])(DealTypeV1)