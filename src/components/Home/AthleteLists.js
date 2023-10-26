/* eslint-disable no-loop-func */
import { Text, Flex, Box } from "@chakra-ui/layout"
import { Link } from "react-router-dom"
import { athletesStyle } from "../../styles/athletesStyle"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"
import supabase from "../../config/supabaseClient"
import { Skeleton } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import ImageWithBlurhash from "../../utils/Blurhash/ImageWithBlurhash"

const AthleteLists = ({ data }) => {
  const [isHovered, setisHovered] = useState(null)

  const handleOnMouseOver = (index) => {
    setisHovered(index)
  }
  const handleOnMouseLeave = (index) => {
    setisHovered(null)
  }

  const duration = 0.4
  const imageAnimation = {
    initial: {
      scale: 1,
      transition: {
        duration: duration,
      },
    },
    animateZoom: {
      scale: 1.2,
      transition: {
        duration: duration,
      },
    },
  }
  return (
    <>
      {data?.pages.map(({ data }) => {
        return data?.map((athlete, index) => {
          const { id, lastName, firstName, current_team, sport, images } =
            athlete

          const profilePictures = athlete.images

          const profilePath = images[0]?.profile_picture?.path
          const imageURL = supabase.storage
            .from(`avatar`)
            .getPublicUrl(profilePath, {
              transform: {
                quality: 83,
                width: 330,
                height: 240,
                resize: "cover", // 'cover' | 'fill' | 'contain'
              },
            })
          const hash =
            profilePictures && profilePictures[0]?.profile_picture?.hash

          return (
            <Flex
              key={index}
              onMouseOver={() => handleOnMouseOver(index)}
              onMouseLeave={() => handleOnMouseLeave(index)}
              w={"100%"}
            >
              <Flex sx={athletesStyle.cardCOntainer} w={"100%"}>
                <Link to={`/profile/${id}`}>
                  {/* ================= Image ================= */}
                  {data === undefined && (
                    <Skeleton
                      startColor="#BCC6D3"
                      endColor="#d9d9d9"
                      w={"320px"}
                      h={"240px"}
                      borderRadius={"md"}
                    />
                  )}
                  {(profilePictures.length === 0 || !profilePath) && (
                    <Flex
                      sx={athletesStyle.imageContainer}
                      bgImage={"url(images/athlete-placeholder.jpg)"}
                    ></Flex>
                  )}
                  {profilePictures.length > 0 && profilePath && (
                    <Flex
                      w={"100%"}
                      overflow={"hidden"}
                      position={"relative"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"md"}
                    >
                      <Flex
                        sx={athletesStyle.imageContainer}
                        bgPosition={"top"}
                        as={motion.div}
                        variants={imageAnimation}
                        initial={"initial"}
                        animate={
                          isHovered === index ? "animateZoom" : "initial"
                        }
                        position={"relative"}
                        h={{sph: '240px', lph: '320px', stl: '240px'}}
                      >
                        {/* <Image
                          src={imageURL && imageURL.data.publicUrl}
                          w={"100%"}
                          loading="lazy"
                        /> */}
                        <ImageWithBlurhash
                          srcOrigin={imageURL.data?.publicUrl}
                          hash={hash}
                        />
                      </Flex>
                    </Flex>
                  )}
                  {/* ================= End of Image ================= */}
                  <Flex flexDirection={"column"} gap={1}>
                    <Text sx={athletesStyle.cardAthleteName}>
                      {firstName} {lastName}
                    </Text>
                    <Text sx={athletesStyle.cardSportsType} noOfLines={[1]}>
                      {sport[0] || "-"} • {current_team[0] || "-"}
                    </Text>
                    <Box sx={athletesStyle.cardSocialMedia}>
                      <ProfileSocialMedia />
                    </Box>
                  </Flex>
                </Link>
              </Flex>
            </Flex>
          )
        })
      })}
    </>
  )
}

export default AthleteLists
