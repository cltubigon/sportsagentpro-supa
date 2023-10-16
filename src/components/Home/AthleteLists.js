import { Text, Flex, Box } from "@chakra-ui/layout"
import { Link } from "react-router-dom"
import { athletesStyle } from "../../styles/athletesStyle"
import ProfileSocialMedia from "../Profile/ProfileSocialMedia"
import supabase from "../../config/supabaseClient"
import { Skeleton } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"

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
    initialOverlay: {
      opacity: 0,
      transition: {
        duration: duration,
      },
    },
    animateOverlay: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
    initialViewHeight: {
      display: "none",
      opacity: 0,
      height: "80px",
      transition: {
        duration: duration,
      },
    },
    animateViewHeight: {
      display: "flex",
      opacity: 0.6,
      height: "50px",
      transition: {
        duration: duration,
      },
    },
  }
  return (
    <>
      {data?.pages.map(({ data }) => {
        return data?.map((athlete, index) => {
          const { id, lastName, firstName, current_team, sport, images } = athlete
          const profilePictures = athlete.images

          const path = images[0]?.profile_picture.path
          const imageURL = supabase.storage.from(`avatar`).getPublicUrl(path, {
            transform: {
              width: 320,
              height: 240,
              resize: "cover", // 'cover' | 'fill' | 'contain'
            },
          })
          return (
            <Flex
              key={index}
              onMouseOver={() => handleOnMouseOver(index)}
              onMouseLeave={() => handleOnMouseLeave(index)}
            >
              <Link to={`/profile/${id}`}>
                <Flex sx={athletesStyle.cardCOntainer}>
                  {/* ================= Image ================= */}
                  {profilePictures.length === 0 && (
                    <Flex
                      sx={athletesStyle.imageContainer}
                      bgImage={"url(images/athlete-placeholder.jpg)"}
                    ></Flex>
                  )}
                  {data === undefined && (
                    <Skeleton
                      startColor="#BCC6D3"
                      endColor="#d9d9d9"
                      w={"320px"}
                      h={"240px"}
                      borderRadius={"md"}
                    />
                  )}
                  {profilePictures.length > 0 && (
                    <Flex
                      w={"100%"}
                      overflow={"hidden"}
                      position={"relative"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"md"}
                    >
                      <Flex
                        w={"80%"}
                        borderTop={"3px solid white"}
                        borderBottom={"3px solid white"}
                        as={motion.div}
                        variants={imageAnimation}
                        initial={"initialViewHeight"}
                        animate={
                          isHovered === index
                            ? "animateViewHeight"
                            : "initialViewHeight"
                        }
                        zIndex={2}
                        position={"absolute"}
                        m={"auto auto"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        pointerEvents={"none"}
                      >
                        <Text
                          fontSize={"xl"}
                          color={"white"}
                          fontWeight={"semibold"}
                        >
                          View Athlete
                        </Text>
                      </Flex>
                      <Flex
                        sx={athletesStyle.imageContainer}
                        bgImage={imageURL && imageURL.data.publicUrl}
                        bgPosition={"center"}
                        as={motion.div}
                        variants={imageAnimation}
                        initial={"initial"}
                        animate={
                          isHovered === index ? "animateZoom" : "initial"
                        }
                        // position={"relative"}
                      >
                        <Flex
                          bgColor={"rgba(0, 0, 0, 0.35)"}
                          w={"100%"}
                          h={"240px"}
                          as={motion.div}
                          variants={imageAnimation}
                          initial={"initialOverlay"}
                          animate={
                            isHovered === index
                              ? "animateOverlay"
                              : "initialOverlay"
                          }
                        ></Flex>
                      </Flex>
                    </Flex>
                  )}
                  {/* ================= End of Image ================= */}
                  <Flex flexDirection={"column"} gap={1}>
                    <Text sx={athletesStyle.cardAthleteName}>
                      {firstName} {lastName}
                    </Text>
                    <Text sx={athletesStyle.cardSportsType} noOfLines={[1]}>
                      {sport[0] || '-'} • {current_team[0] || '-'}
                    </Text>
                    <Box sx={athletesStyle.cardSocialMedia}>
                      <ProfileSocialMedia />
                    </Box>
                  </Flex>
                </Flex>
              </Link>
            </Flex>
          )
        })
      })}
    </>
  )
}

export default AthleteLists
