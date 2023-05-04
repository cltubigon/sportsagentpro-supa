import { Text, Flex, SimpleGrid, Box } from '@chakra-ui/layout'
import { DummyImage } from 'react-simple-placeholder-image'
import ProfileSocialMedia from '../Profile/ProfileSocialMedia'
import { useDispatch, useSelector } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { HomeSkeleton } from '../Skeleton/Skeletons'
import { useEffect } from 'react'
import { saveAthletesToStorage } from '../../store/actions/athleteActions'

const Athletes = () => {
  console.log("-------------------Athletes")
  const dispatch = useDispatch()
  const athletes = useSelector((state)=> state.firestore.ordered.athlete)
  const localAthletes = useSelector(state => state.athlete.athletes)

  console.log('localAthletes: ', localAthletes)
  useEffect(()=> {
    if (athletes) {
      dispatch(saveAthletesToStorage(athletes))
    }
  },[athletes])

  const cardCOntainer = {
      flexDirection: "column",
      gap: 3,
    }
  const imageContainer = {
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
      {localAthletes ? 
        <SimpleGrid minChildWidth={{base: "100%", sm:"290px", md: "300px" }} gap={{base: 3, md: 6}} tabIndex={0}>
          {localAthletes.map((athlete)=> {
              return (
                <div key={athlete.id}>
                  <Link to={`/profile/${athlete.id}`}>
                    <Flex sx={cardCOntainer}  >
                        <Flex sx={imageContainer}>
                            <DummyImage bgColor='transparent' width={"330px"} height={240} placeholder='330x170' />
                        </Flex>
                        <Flex flexDirection={"column"} gap={1}>
                            <Text sx={cardAthleteName}>{athlete.firstName} {athlete.lastName}</Text>
                            <Text sx={cardSportsType}>{athlete.sports} • {athlete.team}</Text>
                            <Box sx={cardSocialMedia}><ProfileSocialMedia /></Box>
                        </Flex>
                    </Flex>
                  </Link>
                </div>
              )
            })
          }
        </SimpleGrid>
        :
        <HomeSkeleton />
      }
    </>
  )
}

export default firestoreConnect([{ collection: 'athlete' }])(Athletes);