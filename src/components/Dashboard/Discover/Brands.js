import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import firstimage from "../../../assets/images/firstimage.jpg"
import { BsHeart } from "react-icons/bs"
import { firestoreConnect } from "react-redux-firebase"
import { useDispatch, useSelector } from "react-redux"
import { saveBrandToStorage } from "../../../store/actions/brandActions"
import { useEffect } from "react"
import { SkeletonDiscover } from "../../Skeleton/SkeletonDiscover"

const Brands = () => {
  const dispatch = useDispatch()
  const brand = useSelector((state) => state.brand)
  const firestore = useSelector((state) => state.firestore)

  const { brands } = brand
  const firestoreBrands = firestore.ordered.brand

  useEffect(() => {
    if (firestoreBrands && brands && firestoreBrands.length !== brands.length) {
      dispatch(saveBrandToStorage(firestoreBrands))
    }
  }, [firestoreBrands])

  const listContainer = {
    bg: `url(${firstimage})`,
    bgSize: "cover",
    bgPosition: "center",
    position: "relative",
    height: "140px",
    w: "230px",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    pb: 7,
    pt: 2,
    borderRadius: "md",
  }
  const IconContainer = {
    px: 3,
    zIndex: "1",
    alignItems: "flex-end",
    w: "100%",
    textAlign: "right",
    color: "#cdcdcd",
  }
  const overlayOfContainer = {
    w: "100%",
    h: "100%",
    bg: "linear-gradient(0deg, #2D4856 0%, rgba(255, 255, 255, 0) 100%)",
    position: "absolute",
    top: 0,
    borderRadius: "md",
  }
  return (
    <>{!firestoreBrands && <SkeletonDiscover />}
      <Flex gap={5} flexWrap={"wrap"}>
        {firestoreBrands &&
          firestoreBrands.map((brand) => {
            const { id, firstName, lastName } = brand
            return (
              <Flex key={id} sx={listContainer}>
                <Box sx={IconContainer}>
                  <Icon as={BsHeart} boxSize={4} />
                </Box>
                <Box px={3} zIndex={"10"} color={"#fff"}>
                  <Text lineHeight={"1.2em"}>
                    {firstName} {lastName}
                  </Text>
                  <Text fontSize={"xs"}>Property</Text>
                </Box>
                <Flex sx={overlayOfContainer}></Flex>
              </Flex>
            )
          })}
      </Flex>
    </>
  )
}

export default firestoreConnect([{ collection: "brand" }])(Brands)
