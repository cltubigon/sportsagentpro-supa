import { Text, Flex, SimpleGrid, Box } from '@chakra-ui/layout'
import React from 'react'
import Teams from '../Content/Teams'
import { DummyImage } from 'react-simple-placeholder-image'
import ProfileSocialMedia from '../Profile/ProfileSocialMedia'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

const Athletes = ({athletes}) => {
    // console.log(athletes)
    const cardCOntainer = {
        flexDirection: "column",
        gap: 3,
      }
      const imageContainer = {
        borderRadius: "lg",
        width: "100%",
        bg: "gray.400",
        justifyContent: "center",
        borderRadius: "md",
      }
      const cardAthleteName = {
        fontSize: "xl",
        fontWeight: "semibold",
      }
      const cardSportsType = {
        color: "gray.600",
      }
      const cardSocialMedia = {
        color: "gray.500",
        pb: 5,
      }
  return (
    <>
    <SimpleGrid minChildWidth={"300px"} gap={6}>
        {athletes && athletes.map((athlete)=> {
            return (
                <Flex sx={cardCOntainer} key={athlete.id} >
                    <Link to={"/profile/" + athlete.id}>
                    <Flex sx={imageContainer}>
                        <DummyImage bgColor='transparent' width={"330px"} height={240} placeholder='330x170' />
                    </Flex>
                    <Flex flexDirection={"column"} gap={1}>
                        <Text sx={cardAthleteName}>{athlete.firstName} {athlete.lastName}</Text>
                        <Text sx={cardSportsType}>{athlete.sports} • {athlete.team}</Text>
                        <Box sx={cardSocialMedia}><ProfileSocialMedia /></Box>
                    </Flex>
                </Link>
                </Flex>
            )
            })
        }
      </SimpleGrid>
    </>
  )
}

const mapStateToProps = (state) => {
    return {
      athletes: state.firestore.ordered.athlete
    }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'athlete'}
    ])
)(Athletes)