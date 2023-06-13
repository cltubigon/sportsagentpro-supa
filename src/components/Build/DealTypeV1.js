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
import { Link, useLocation, useParams } from "react-router-dom"
import { resetBuildState, uildState, savePostType, setActiveStep, setBuildState, setPostOwner, setEditMode } from "../../store/actions/buildPostActions"
import { useEffect } from "react"
import { BsChevronRight } from "react-icons/bs"
import { firestoreConnect } from "react-redux-firebase"
import { savePostsToStorage } from "../../store/actions/postActions"
import BuildMenu from "./BuildMenu"

const DealTypeV1 = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const location = useLocation()

    const build = useSelector(state => state.build)
    const post = useSelector(state => state.post)
    const auth = useSelector(state => state.auth)
    const reduxState = useSelector(state => state)
    const firestore = useSelector(state => state.firestore)
    const firebase = useSelector((state) => state.firebase)

    console.log('build: ', build)
    console.log('reduxState: ', reduxState)

    const { email } = auth
    const { postType, postOwner, editMode } = build
    
    const { posts } = post
    const firestorePost = firestore.ordered.posts

    useEffect(()=> {
        const selectedPost = posts && posts.find(post => post.id === id)
        console.log('selectedPost out: ', selectedPost)
        if (selectedPost && Object.keys(selectedPost).length > 0) {
            console.log('This is running')
            const isDifferent = selectedPost.id !== build.id
            isDifferent && dispatch(setEditMode(false))
            console.log('selectedPost.id: ', selectedPost.id)
            console.log('build.id: ', build.id)
            console.log('isDifferent: ', isDifferent)
            console.log('editMode: ', editMode)
            !editMode && isDifferent && dispatch(resetBuildState())
            !editMode && isDifferent && dispatch(setBuildState(selectedPost, 'sender is DealType line53'))
        } else {
            console.log('selectedPost: ', selectedPost)
            console.log('editMode: ', editMode)
            console.log('location.pathname: ', location.pathname)
            editMode && dispatch(resetBuildState('else'))
            dispatch(setPostOwner(email))
            // dispatch(setEditMode(false))
        }
    }, [posts])

    useEffect(() => {
        if (firestorePost && posts && firestorePost.length !== posts.length) {
          const filterToOwnerPosts = firestorePost && firebase.auth.uid && firestorePost.filter(post => post.ownerUID === firebase.auth.uid)
          dispatch(savePostsToStorage(filterToOwnerPosts))
        }
      }, [firestorePost])

    useEffect(()=> {
        if (email) {
            console.log('postOwner: ', postOwner)
            console.log('email: ', email)
            postOwner !== email && dispatch(resetBuildState('postOwner'))
            postOwner !== email && console.log('I was reset')
            postOwner !== email && dispatch(setPostOwner(email))
        }
        return
    }, [email])
    
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
            <BuildMenu />
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